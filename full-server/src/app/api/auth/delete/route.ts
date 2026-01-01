import { userDelete } from "@/server/controller/authController";

export async function DELETE(req: Request) {
    return await userDelete(req);
}