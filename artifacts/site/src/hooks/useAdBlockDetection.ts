import { useState, useEffect } from "react";

declare global {
  interface Navigator {
    brave?: { isBrave: () => Promise<boolean> };
  }
}

function isBraveBrowser(): Promise<boolean> {
  try {
    if (navigator.brave && typeof navigator.brave.isBrave === "function") {
      return navigator.brave.isBrave();
    }
  } catch {
    // not Brave
  }
  return Promise.resolve(false);
}

function testBraveShields(): Promise<boolean> {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    const timer = setTimeout(() => {
      script.remove();
      resolve(false);
    }, 3000);
    script.onload = () => {
      clearTimeout(timer);
      script.remove();
      resolve(false);
    };
    script.onerror = () => {
      clearTimeout(timer);
      script.remove();
      resolve(true);
    };
    script.src =
      "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?cb=" +
      Date.now();
    document.head.appendChild(script);
  });
}

function testBaitElement(): Promise<boolean> {
  return new Promise(async (resolve) => {
    try {
      const bait = document.createElement("div");
      bait.className = "ads ad adsbox ad-placement doubleclick textads";
      bait.setAttribute("id", "ads");
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

export function useAdBlockDetection() {
  const [adBlockDetected, setAdBlockDetected] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const detect = async () => {
      const brave = await isBraveBrowser();

      if (brave) {
        // For Brave: use a script-load test to accurately detect shields state.
        // The no-cors fetch and bait element give false results in Brave.
        const shieldsOn = await testBraveShields();
        setAdBlockDetected(shieldsOn);
      } else {
        // For all other browsers: bait element is reliable
        const baitBlocked = await testBaitElement();
        setAdBlockDetected(baitBlocked);
      }

      setChecked(true);
    };

    detect();
  }, []);

  return { adBlockDetected, checked };
}
