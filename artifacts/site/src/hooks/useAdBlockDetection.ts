import { useState, useEffect } from "react";

export function useAdBlockDetection() {
  const [adBlockDetected, setAdBlockDetected] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const detect = async () => {
      let detected = false;

      // Method 1: bait element — ad blockers hide elements with ad class names
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

        if (
          rect.height === 0 ||
          rect.width === 0 ||
          style.display === "none" ||
          style.visibility === "hidden" ||
          style.opacity === "0" ||
          bait.offsetParent === null
        ) {
          detected = true;
        }
        document.body.removeChild(bait);
      } catch {
        detected = true;
      }

      // Method 2: fetch a known ad-network URL (blocked when shields/ad blocker is ON)
      if (!detected) {
        try {
          await fetch(
            "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js",
            { method: "HEAD", mode: "no-cors", cache: "no-store", signal: AbortSignal.timeout(3000) }
          );
        } catch {
          detected = true;
        }
      }

      setAdBlockDetected(detected);
      setChecked(true);
    };

    detect();
  }, []);

  return { adBlockDetected, checked };
}
