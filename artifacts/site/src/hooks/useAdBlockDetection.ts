import { useState, useEffect } from "react";

declare global {
  interface Navigator {
    brave?: { isBrave: () => Promise<boolean> };
  }
}

const BRAVE_PASS_KEY = "_bp";

async function checkIsBrave(): Promise<boolean> {
  try {
    if (navigator.brave && typeof navigator.brave.isBrave === "function") {
      return await navigator.brave.isBrave();
    }
  } catch {
    // not Brave
  }
  return false;
}

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
    (async () => {
      const brave = await checkIsBrave();

      if (brave) {
        // Brave: check if user already clicked "reload" this session
        if (sessionStorage.getItem(BRAVE_PASS_KEY)) {
          sessionStorage.removeItem(BRAVE_PASS_KEY);
          setAdBlockDetected(false);
        } else {
          // Always show popup for Brave users until they acknowledge
          setAdBlockDetected(true);
        }
      } else {
        // Non-Brave: detect actual blocking via self-hosted bait file
        const blocked = await isAdBlocked();
        setAdBlockDetected(blocked);
      }

      setChecked(true);
    })();
  }, []);

  return { adBlockDetected, checked };
}
