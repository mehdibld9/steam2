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

async function testBaitFile(): Promise<boolean> {
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

function testBaitElement(): Promise<boolean> {
  return new Promise(async (resolve) => {
    try {
      const bait = document.createElement("div");
      bait.className = "ads ad adsbox doubleclick ad-placement textads";
      bait.setAttribute("id", "AdSense");
      bait.innerHTML = "&nbsp;";
      bait.style.cssText =
        "position:absolute;top:-9999px;left:-9999px;width:1px;height:1px;pointer-events:none;";
      document.body.appendChild(bait);

      await new Promise((r) => setTimeout(r, 150));

      const rect = bait.getBoundingClientRect();
      const style = window.getComputedStyle(bait);
      const hidden =
        rect.height === 0 ||
        rect.width === 0 ||
        style.display === "none" ||
        style.visibility === "hidden" ||
        style.opacity === "0" ||
        bait.offsetParent === null;

      document.body.removeChild(bait);
      resolve(hidden);
    } catch {
      resolve(true);
    }
  });
}

async function isAdBlocked(): Promise<boolean> {
  const [baitFile, baitElement] = await Promise.all([
    testBaitFile(),
    testBaitElement(),
  ]);
  return baitFile || baitElement;
}

export function useAdBlockDetection() {
  const [adBlockDetected, setAdBlockDetected] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    (async () => {
      const brave = await checkIsBrave();

      if (brave) {
        if (sessionStorage.getItem(BRAVE_PASS_KEY)) {
          sessionStorage.removeItem(BRAVE_PASS_KEY);
          setAdBlockDetected(false);
        } else {
          setAdBlockDetected(true);
        }
      } else {
        const blocked = await isAdBlocked();
        setAdBlockDetected(blocked);
      }

      setChecked(true);
    })();
  }, []);

  return { adBlockDetected, checked };
}
