import { fetchAnimeById } from "@/server/controller/animesController";

export async function GET(req: Request) {
    return await fetchAnimeById(req);
}