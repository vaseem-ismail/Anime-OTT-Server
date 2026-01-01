"use client";

import { useState, useEffect } from "react";
import { Stars } from "@/components/Stars";
import { MoonToggle } from "@/components/MoonToggle";
import { SearchPanel } from "@/components/SearchPanel";
import { useRouter } from "next/navigation";
import { Bell } from "lucide-react";

interface Anime {
  _id: string;
  name: string;
  genre: string;
  "image-url": string;
}

export default function HomePage() {
  const [openSearch, setOpenSearch] = useState(false);
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [genreMap, setGenreMap] = useState<Record<string, Anime[]>>({});
  const router = useRouter();

  // Fetch all animes
  useEffect(() => {
    fetch("http://localhost:3000/api/stream/getAllAnimes")
      .then((res) => res.json())
      .then((data) => {
        setAnimes(data.animes || []);

        // Categorize by genre
        const map: Record<string, Anime[]> = {};
        (data.animes || []).forEach((anime: Anime) => {
          if (!map[anime.genre]) map[anime.genre] = [];
          map[anime.genre].push(anime);
        });
        setGenreMap(map);
      });
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden text-white">
      <Stars />
      <MoonToggle onClick={() => setOpenSearch(!openSearch)} />
      <SearchPanel open={openSearch} allAnimes={animes} />

      {/* Floating Header */}
      <div className="fixed top-5 left-0 w-full flex justify-center items-center z-50">
        <h1 className="text-2xl font-bold">ANIME GALAXY</h1>
        <button
          className="absolute right-10"
          onClick={() => router.push("/notifications")}
        >
          <Bell size={28} className="text-white" />
        </button>
      </div>

      <div className="pt-32 px-10 space-y-8">
        {Object.keys(genreMap).map((genre) => (
          <div key={genre}>
            <h2 className="text-xl font-semibold mb-4">{genre}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {genreMap[genre].map((anime) => (
                <div
                  key={anime._id}
                  className="bg-white/10 p-2 rounded hover:scale-105 transition-transform cursor-pointer"
                >
                  <img
                    src={anime["image-url"]}
                    alt={anime.name}
                    className="w-full h-40 object-cover rounded"
                  />
                  <p className="mt-2 text-sm text-center">{anime.name}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
