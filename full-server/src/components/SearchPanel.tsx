"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";

interface Anime {
  _id: string;
  name: string;
  genre: string;
  "image-url": string;
}

interface SearchPanelProps {
  open: boolean;
  allAnimes: Anime[];
}

export function SearchPanel({ open, allAnimes }: SearchPanelProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Anime[]>([]);

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
    } else {
      const filtered = allAnimes.filter((anime) =>
        anime.name.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    }
  }, [query, allAnimes]);

  return (
    <div
      className={`fixed top-0 left-0 w-[420px] h-[15vh] bg-transparent z-40 text-black
      transition-transform duration-500 ease-in-out
      ${open ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="p-6 pl-25">
        <div className="flex rounded-lg border overflow-hidden border-black">
          <input
            className="flex-1 bg-white px-4 py-3 outline-none"
            placeholder="Search anime..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="bg-black rounded border border-white text-white px-3 flex items-center justify-center">
            <Search size={20} />
          </button>
        </div>

        {/* Search results (kept inside your design) */}
        {results.length > 0 && (
          <div className="mt-2 max-h-64 overflow-y-auto bg-white/80 rounded shadow-lg">
            {results.map((anime) => (
              <div
                key={anime._id}
                className="flex items-center gap-3 p-2 hover:bg-gray-200/20 rounded cursor-pointer"
              >
                <img
                  src={anime["image-url"]}
                  alt={anime.name}
                  className="w-12 h-12 object-cover rounded"
                />
                <span className="text-black">{anime.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
