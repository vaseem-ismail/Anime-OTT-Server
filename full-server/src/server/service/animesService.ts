import { getAnimesCollection, getCastCollection } from "../db/db";


export async function getAllAnimes() {
    const animesCollection = getAnimesCollection();
    const animes = await animesCollection.find({}, {projection: { _id: 1, name: 1, "image-url": 1, genre: 1}}).toArray();
    return animes;
}

export async function getAnimeById(animeId: string) {
    const animesCollection = getAnimesCollection();
    const anime = await animesCollection.findOne({ id: animeId });
    return anime;
}

export async function getAnimeCast(animeId: string) {
    const castCollection = getCastCollection();
    const cast = await castCollection.find({ animeId }).toArray();
    return cast;
}