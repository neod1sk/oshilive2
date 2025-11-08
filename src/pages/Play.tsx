import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { Hud } from "../components/Hud";
import { LightButton } from "../components/LightButton";
import { useAnimationFrame } from "../hooks/useAnimationFrame";
import { useGameActions, useGameState } from "../game/store";
import { useTranslation } from "../hooks/useTranslation";

export const PlayPage = () => {
  const { tick, stopGame } = useGameActions();
  const playing = useGameState((s) => s.playing);
  const startedAt = useGameState((s) => s.startedAt);
  const navigate = useNavigate();
  const t = useTranslation();

  useAnimationFrame((now) => tick(now), playing);

  useEffect(() => {
    if (!playing && startedAt === 0) {
      navigate("/");
    }
  }, [playing, startedAt, navigate]);

  const handleFinish = () => {
    stopGame();
    navigate("/result");
  };

  // ゲーム終了時に自動的に結果画面へ
  useEffect(() => {
    if (!playing && startedAt > 0) {
      const timeout = window.setTimeout(() => {
        navigate("/result");
      }, 500);
      return () => window.clearTimeout(timeout);
    }
  }, [playing, startedAt, navigate]);

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,210,211,0.18),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(255,45,85,0.25),transparent_60%)]" />
      <div className="absolute top-4 right-4 z-20">
        <LanguageSwitcher />
      </div>
      <div className="relative z-10 flex min-h-screen flex-col items-center gap-8 pb-24">
        <Hud />
        <div className="mt-auto pb-16">
          <LightButton />
        </div>
        <div className="fixed bottom-4 flex w-full max-w-xl justify-between px-6 text-xs text-white/60 font-mono">
          <span>{t("earnScore")}</span>
          <button
            type="button"
            onClick={handleFinish}
            className="rounded-full border border-white/20 bg-white/10 px-4 py-2"
          >
            {t("goToResult")}
          </button>
        </div>
      </div>
    </main>
  );
};
