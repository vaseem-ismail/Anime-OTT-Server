"use client";

export function BookSpine({ anime }: any) {
  return (
    <div
      className="h-50 w-50 bg-gradient-to-b from-[#5a3825] to-[#2a160b]
                 rounded-sm cursor-pointer hover:scale-105 transition
                 flex items-end justify-center"
    >
      <span
        className="text-xs text-white mb-2 rotate-[-90deg] break-words text-center width-[100px]"
        style={{ maxWidth: "10rem" }}
      >
        {anime.name}
      </span>
    </div>
  );
}
