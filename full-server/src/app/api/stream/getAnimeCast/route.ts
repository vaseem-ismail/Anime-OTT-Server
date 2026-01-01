import { fetchAnimeCast } from "@/server/controller/animesController";

export async function GET(req: Request) {
    return await fetchAnimeCast(req);
}