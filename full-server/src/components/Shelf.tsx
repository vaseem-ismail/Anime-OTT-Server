"use client";
import { BookSpine } from "./BookSpine";

export function Shelf({ genre, animes }: any) {
  return (
    <div className="mb-14">
      <h2 className="text-xl mb-3 text-sky-300">{genre}</h2>

      <div
        className="relative bg-[#3b2a1a] rounded-lg p-4 flex gap-3 overflow-x-auto scrollbar-thin scrollbar-thumb-sky-400 scrollbar-track-[#3b2a1a]"
      >
        {animes.map((anime: any) => (
          <BookSpine key={anime._id} anime={anime} />
        ))}
      </div>
    </div>
  );
}