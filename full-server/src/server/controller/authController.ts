import { NextResponse } from "next/server";
import { login, register, changePassword, deleteUser } from "../service/authService";

export async function userLogin(req: Request) {
    try {
        const { email, password } = await req.json();
        const token = await login(email, password);
        return NextResponse.json({ token }, { status: 200 });
    } catch (error) {
        console.error("Error during login:", error);
        return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
    }
}

export async function userRegister(req: Request) {
    try {
        const { name, email, password } = await req.json();
        await register(name, email, password);
        return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
    }
    catch (error) {
        console.error("Error during registration:", error);
        return NextResponse.json({ message: error instanceof Error ? error.message : "Internal Server Error" }, { status: 400 });
    }
}

export async function userChangePassword(req: Request) {
    try {
        const { email, newPassword } = await req.json();
        await changePassword(email, newPassword);
        return NextResponse.json({ message: "Password changed successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error changing password:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function userDelete(req: Request) {
    try {
        const { email } = await req.json();
        await deleteUser(email);
        return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting user:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
