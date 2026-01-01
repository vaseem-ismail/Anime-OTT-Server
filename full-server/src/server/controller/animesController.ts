import { NextResponse } from "next/server";
import { getAllAnimes, getAnimeById, getAnimeCast } from "../service/animesService";

export async function fetchAllAnimes() {
    try {
        const animes = await getAllAnimes();
        return NextResponse.json({ animes }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function fetchAnimeById(req: Request) {
    try {
        const { animeId } = await req.json();
        const anime = await getAnimeById(animeId);
        if (!anime) {
            return NextResponse.json({ message: "Anime not found" }, { status: 404 });
        }
        return NextResponse.json({ anime }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function fetchAnimeCast(req: Request) {
    try {
        const { animeId } = await req.json();
        const cast = await getAnimeCast(animeId);
        return NextResponse.json({ cast }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}