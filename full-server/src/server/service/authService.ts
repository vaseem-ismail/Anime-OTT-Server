import { getUsersCollection, getWatchLaterDB, getHistoryDB } from "../db/db";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import config from "../config";

const JWT_SECRET = config.JWT_SECRET;

async function hashPassword(password: string) {
    return argon2.hash(password, {
        type: argon2.argon2id,
        memoryCost: 2 ** 16,
        timeCost: 3,
        parallelism: 1,
    });
}

async function verifyPassword(
    hash: string,
    password: string,
) {
    return argon2.verify(hash, password);
}

export async function login(email: string, password: string) {
    const usersCollection = getUsersCollection();
    const user = await usersCollection.findOne({ email });

    if (!user) {
        return false;
    }

    const isPasswordValid = await verifyPassword(user.password, password);

    if (!isPasswordValid) {
        return false;
    }
    const token = await createToken({ email });
    return token;
}

export async function register(name: string, email: string, password: string) {
    const usersCollection = getUsersCollection();
    const existingUser = await usersCollection.findOne({ email });

    if (existingUser) {
        throw new Error("User already exists");
    }

    const hashedPassword = await hashPassword(password);

    const newUser = {
        name,
        email,
        password: hashedPassword,
        createdAt: new Date(),
    };

    const result = await usersCollection.insertOne(newUser);
    const watchLaterDB = getWatchLaterDB();
    await watchLaterDB.createCollection(`watch_later_${result.insertedId}`);

    const historyDB = getHistoryDB();
    await historyDB.createCollection(`history_${result.insertedId}`);

    return { ...newUser, _id: result.insertedId };
}

export async function changePassword(email: string, newPassword: string) {
    const usersCollection = getUsersCollection();
    const hashedPassword = await hashPassword(newPassword);

    const result = await usersCollection.updateOne(
        { email },
        { $set: { password: hashedPassword } }
    );

    if (result.matchedCount === 0) {
        return false;
    }

    return true;
}

export async function deleteUser(email: string) {
    const usersCollection = getUsersCollection();
    const getId = await usersCollection.findOne({ email: email }, { projection: { _id: 1, password: 0 } });
    const id = getId?._id
    const result = await usersCollection.deleteOne({ email });
    await getHistoryDB().dropCollection(`history_${id}`);
    await getWatchLaterDB().dropCollection(`watch_later_${id}`);
    if (result.deletedCount === 0) {
        return false;
    }
    return true;
}

async function createToken(payload: object) {
    return jwt.sign(payload, JWT_SECRET!, { expiresIn: "7d" });
}