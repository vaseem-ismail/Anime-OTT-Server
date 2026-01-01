"use client";
import { useEffect, useState } from "react";

export function Stars() {
  const [stars, setStars] = useState<any[]>([]);

  useEffect(() => {
    setStars(
      Array.from({ length: 80 }).map(() => ({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 5}s`,
      }))
    );
  }, []);

  return (
    <div className="fixed inset-0 -z-10">
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute h-[2px] w-[2px] bg-white rounded-full opacity-70 animate-[twinkle_3s_infinite]"
          style={{ top: s.top, left: s.left, animationDelay: s.delay }}
        />
      ))}
    </div>
  );
}
