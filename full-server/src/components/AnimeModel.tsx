"use client";

export function AnimeModal({ anime, onClose }: any) {
  if (!anime) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur z-50 flex items-center justify-center">
      <div className="bg-white text-black rounded-xl w-[420px] p-6 relative">
        <button onClick={onClose} className="absolute top-2 right-3">✕</button>
        <h2 className="text-xl font-bold">{anime.title}</h2>
        <p className="mt-2 text-sm">{anime.description}</p>
      </div>
    </div>
  );
}
