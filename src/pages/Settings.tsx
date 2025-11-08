import { useNavigate } from "react-router-dom";

import { LanguageSwitcher } from "../components/LanguageSwitcher";
import type { Difficulty, Judgement } from "../game/engine";
import { useGameActions, useSettings } from "../game/store";
import { useTranslation } from "../hooks/useTranslation";

const difficultyOptions: { label: string; value: Difficulty; description: string }[] = [
  { label: "EASY", value: "EASY", description: "ヒット ±80ms / センター3.0s / タップのみ" },
  { label: "NORMAL", value: "NORMAL", description: "ヒット ±60ms / センター2.5s / タップ+シェイク" },
  { label: "HARD", value: "HARD", description: "ヒット ±40ms / センター2.0s / タップ+フリック" }
];

const judgementDisplay: Judgement[] = ["PERFECT", "GREAT", "GOOD", "MISS"];

export const SettingsPage = () => {
  const settings = useSettings();
  const { setDifficulty, toggleColorblindMode, setVibration } = useGameActions();
  const navigate = useNavigate();
  const t = useTranslation();

  return (
    <main className="relative min-h-screen overflow-hidden px-5 pb-16 pt-14">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(188,255,0,0.14),transparent_55%)]" />
      <div className="absolute top-4 right-4 z-20">
        <LanguageSwitcher />
      </div>
      <div className="relative z-10 mx-auto flex max-w-xl flex-col gap-6">
        <h1 className="text-2xl font-display tracking-[0.35em] uppercase text-white">{t("settingsTitle")}</h1>

        <section className="rounded-3xl border border-white/10 bg-white/5 px-5 py-6 backdrop-blur">
          <h2 className="text-sm font-mono tracking-[0.3em] text-white/70 uppercase">{t("difficulty")}</h2>
          <div className="mt-4 space-y-3">
            {difficultyOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setDifficulty(option.value)}
                className={`w-full rounded-2xl border px-4 py-4 text-left transition ${
                  settings.difficulty === option.value
                    ? "border-pink-400/60 bg-pink-500/20 text-white"
                    : "border-white/15 bg-white/5 text-white/70"
                }`}
              >
                <div className="text-base font-display tracking-[0.3em] uppercase">{option.label}</div>
                <div className="mt-1 text-xs text-white/60">{option.description}</div>
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 px-5 py-6 backdrop-blur">
          <div className="space-y-3 text-sm text-white/70">
            <SwitchRow
              label={t("colorMode")}
              description={t("colorModeDesc")}
              value={settings.colorblindMode}
              onChange={toggleColorblindMode}
            />
            <SwitchRow
              label={t("vibration")}
              description={t("vibrationDesc")}
              value={settings.enableVibration}
              onChange={setVibration}
            />
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 px-5 py-6 backdrop-blur">
          <h2 className="text-sm font-mono tracking-[0.3em] text-white/70 uppercase">{t("judgementManual")}</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm font-mono tracking-[0.3em] uppercase">
            {judgementDisplay.map((judge) => (
              <div key={judge} className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-center text-white">
                {judge}
              </div>
            ))}
          </div>
        </section>

        <button
          type="button"
          onClick={() => navigate("/")}
          className="mx-auto rounded-full border border-white/20 bg-white/10 px-6 py-3 text-xs font-mono tracking-[0.4em] uppercase text-white/80"
        >
          {t("back")}
        </button>
      </div>
    </main>
  );
};

type ToggleButtonProps = {
  label: string;
  active: boolean;
  onClick: () => void;
};

const ToggleButton = ({ label, active, onClick }: ToggleButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    className={`rounded-full border px-3 py-2 ${
      active ? "border-violet-400/60 bg-violet-500/30 text-white" : "border-white/15 bg-white/5 text-white/60"
    }`}
  >
    {label}
  </button>
);

type SwitchRowProps = {
  label: string;
  description: string;
  value: boolean;
  onChange: (value: boolean) => void;
};

const SwitchRow = ({ label, description, value, onChange }: SwitchRowProps) => (
  <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/25 px-4 py-3">
    <div>
      <div className="text-xs font-mono tracking-[0.3em] uppercase text-white/80">{label}</div>
      <div className="text-[11px] text-white/50">{description}</div>
    </div>
    <button
      type="button"
      onClick={() => onChange(!value)}
      className={`h-8 w-14 rounded-full border transition ${
        value ? "border-pink-400/80 bg-pink-500/60" : "border-white/20 bg-white/10"
      }`}
    >
      <div
        className={`h-6 w-6 translate-y-1 rounded-full bg-white shadow transition ${value ? "translate-x-7" : "translate-x-1"}`}
      />
    </button>
  </div>
);



