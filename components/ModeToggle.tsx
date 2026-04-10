"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

// This is a "no-op" store that returns true on client, false on server
const emptySubscribe = () => () => {};
function useIsMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,  // Client value
    () => false  // Server/Hydration value
  );
}

export default function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useIsMounted();

  // If not mounted, show a matching placeholder to prevent layout shift
  if (!mounted) {
    return <div className="size-9 rounded-md border border-border bg-card" />;
  }

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="size-9 flex items-center justify-center rounded-md border border-border bg-card hover:bg-accent transition"
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4 text-yellow-500" />
      ) : (
        <Moon className="w-4 h-4 text-slate-700" />
      )}
    </button>
  );
}