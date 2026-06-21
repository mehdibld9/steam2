import { useState } from "react";
import { Switch, Route, Router as WouterRouter, Link, useLocation } from "wouter";
import DownloadPage from "./pages/DownloadPage";
import KeyPage from "./pages/KeyPage";
import AdBlockModal from "./components/AdBlockModal";
import { useAdBlockDetection } from "./hooks/useAdBlockDetection";

function Nav() {
  const [location] = useLocation();
  return (
    <nav style={{ position: "fixed", top: "1.5rem", left: "50%", transform: "translateX(-50%)", zIndex: 50, display: "flex", gap: "0.5rem" }}>
      <Link href="/" className={`nav-btn${location === "/" ? " active" : ""}`}>
        Download
      </Link>
      <Link href="/key" className={`nav-btn${location === "/key" ? " active" : ""}`}>
        Get Key
      </Link>
    </nav>
  );
}

function AppShell() {
  const { adBlockDetected, checked } = useAdBlockDetection();
  const [dismissed, setDismissed] = useState(false);

  return (
    <>
      <Nav />
      <Switch>
        <Route path="/" component={DownloadPage} />
        <Route path="/key" component={KeyPage} />
      </Switch>
      {checked && adBlockDetected && !dismissed && (
        <AdBlockModal onDismiss={() => setDismissed(true)} />
      )}
    </>
  );
}

function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <AppShell />
    </WouterRouter>
  );
}

export default App;
