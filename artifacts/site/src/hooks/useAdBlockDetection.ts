import { useState, useEffect } from "react";

declare global {
  interface Navigator {
    brave?: { isBrave: () => Promise<boolean> };
  }
}

export function useAdBlockDetection() {
  const [adBlockDetected, setAdBlockDetected] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const detect = async () => {
      let detected = false;

      // Method 1: Brave browser native API
      try {
        if (navigator.brave && typeof navigator.brave.isBrave === "function") {
          const isBrave = await navigator.brave.isBrave();
          if (isBrave) detected = true;
        }
      } catch {
        // not Brave or API unavailable
      }

      // Method 2: bait element — ad blockers hide elements with ad class names
      if (!detected) {
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
      }

      // Method 3: fetch a known ad-network URL (blocked by most blockers including Brave Shields)
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

      // Method 4: canvas fingerprint noise (Brave randomizes canvas — detect via pixel deviation)
      if (!detected) {
        try {
          const canvas = document.createElement("canvas");
          canvas.width = 200;
          canvas.height = 50;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.textBaseline = "top";
            ctx.font = "14px 'Arial'";
            ctx.fillStyle = "#f60";
            ctx.fillRect(125, 1, 62, 20);
            ctx.fillStyle = "#069";
            ctx.fillText("Brave detect 👋", 2, 15);
            ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
            ctx.fillText("Brave detect 👋", 4, 17);

            const data1 = canvas.toDataURL();

            // Re-draw same content — if Brave randomises canvas, results differ
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#f60";
            ctx.fillRect(125, 1, 62, 20);
            ctx.fillStyle = "#069";
            ctx.fillText("Brave detect 👋", 2, 15);
            ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
            ctx.fillText("Brave detect 👋", 4, 17);

            const data2 = canvas.toDataURL();

            if (data1 !== data2) {
              detected = true;
            }
          }
        } catch {
          // canvas blocked — also suspicious
        }
      }

      setAdBlockDetected(detected);
      setChecked(true);
    };

    detect();
  }, []);

  return { adBlockDetected, checked };
}
