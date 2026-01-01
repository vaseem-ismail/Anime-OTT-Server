"use client";

import { useEffect, useState } from "react";

export function MoonToggle({ onClick }: { onClick: () => void }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={onClick}
      className="fixed top-6 left-6 z-50 h-16 w-16 rounded-full
                 bg-gradient-to-br from-gray-200 to-gray-400"
    >
    </button>
  );
}
