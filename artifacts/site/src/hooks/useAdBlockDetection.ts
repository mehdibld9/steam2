import { useState, useEffect } from "react";

async function isAdBlocked(): Promise<boolean> {
  try {
    const base = import.meta.env.BASE_URL ?? "/";
    const url = base.replace(/\/$/, "") + "/adsense.js?cb=" + Date.now();
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return true;
    const text = await res.text();
    return text.trim().length === 0;
  } catch {
    return true;
  }
}

export function useAdBlockDetection() {
  const [adBlockDetected, setAdBlockDetected] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    isAdBlocked().then((blocked) => {
      setAdBlockDetected(blocked);
      setChecked(true);
    });
  }, []);

  return { adBlockDetected, checked };
}
