import { useState, useEffect } from "react";

export function useAdBlockDetection() {
  const [adBlockDetected, setAdBlockDetected] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const detect = async () => {
      let detected = false;

      // Method 1: bait element — ad blockers hide elements with these class names
      try {
        const bait = document.createElement("div");
        bait.className = "ads ad adsbox ad-placement doubleclick";
        bait.style.cssText = "position:absolute;top:-9999px;left:-9999px;width:1px;height:1px;";
        bait.setAttribute("id", "ad-banner-test");
        document.body.appendChild(bait);

        await new Promise((r) => setTimeout(r, 100));

        const style = window.getComputedStyle(bait);
        if (
          bait.offsetHeight === 0 ||
          bait.offsetWidth === 0 ||
          style.display === "none" ||
          style.visibility === "hidden" ||
          style.opacity === "0"
        ) {
          detected = true;
        }

        document.body.removeChild(bait);
      } catch {
        detected = true;
      }

      // Method 2: try fetching a URL that ad blockers typically block
      if (!detected) {
        try {
          const res = await fetch(
            "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js",
            { method: "HEAD", mode: "no-cors", cache: "no-store" }
          );
          // If fetch completes (even opaque), ad blocker likely not blocking
          void res;
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
