import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import { PlayPage } from "./pages/Play";
import { RankingPage } from "./pages/Ranking";
import { ResultPage } from "./pages/Result";
import { SettingsPage } from "./pages/Settings";
import { TitlePage } from "./pages/Title";
import { useGameStore } from "./game/store";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  const mode = useGameStore((s) => s.settings.colorblindMode);

  useEffect(() => {
    document.body.dataset.colorblind = mode ? "true" : "false";
  }, [mode]);

  return (
    <div className="min-h-screen bg-background text-white font-body">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<TitlePage />} />
        <Route path="/play" element={<PlayPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/ranking" element={<RankingPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;



