import { userRegister } from "@/server/controller/authController";

export async function POST(req: Request) {
    return await userRegister(req);
}