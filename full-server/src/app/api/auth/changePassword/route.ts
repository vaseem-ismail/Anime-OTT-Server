import { userChangePassword } from "@/server/controller/authController";

export async function POST(req: Request) {
    return await userChangePassword(req);
}