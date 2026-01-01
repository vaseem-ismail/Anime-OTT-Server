import { userLogin } from "@/server/controller/authController";

export async function POST(req: Request) {
    return await userLogin(req);
}