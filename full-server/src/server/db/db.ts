import { MongoClient } from "mongodb";
import config from "../config";

const MongoUri:string = config.MONGO_URI!;
const client = new MongoClient(MongoUri);

let isConnected = false;

export async function connectDB() {
  try {
    if (!isConnected) {
      await client.connect();
      isConnected = true;
      console.log("✅ MongoDB connected");
    }
  } catch (err)  {
    console.error("❌ DB connection error:", err);
    process.exit(1);
  }
}

export function getUsersDB(){
    return client.db("Anime-Galaxy");
}

export function getWatchLaterDB() {
    return client.db("Watch-Later");
}

export function getHistoryDB() {
    return client.db("History");
}

export function getAnimesDB() {
    return client.db("Animes");
}

//Collections

export function getUsersCollection(){
    return getUsersDB().collection("users");
}

export function getAnimesCollection(){
    return getAnimesDB().collection("details");
}

export function getCastCollection(){
    return getAnimesDB().collection("cast");
}