import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { COLOR_HEX, type LightColor } from "../game/colors";
import { useTranslation } from "../hooks/useTranslation";
import { useColorName } from "../hooks/useColorName";
import { getSupabaseClient } from "../lib/supabase";

type Period = "day" | "week" | "all";

type RankingEntry = {
  id: string;
  name: string;
  avatar?: string | null;
  score: number;
  hearts: number;
  bestColor?: LightColor;
  createdAt: string;
};

const FALLBACK_ENTRIES: RankingEntry[] = [
  {
    id: "demo-1",
    name: "FRONT ROW OTAKU",
    score: 28500,
    hearts: 12,
    bestColor: "RED",
    createdAt: new Date().toISOString()
  },
  {
    id: "demo-2",
    name: "PENLIGHT MASTER",
    score: 24100,
    hearts: 9,
    bestColor: "VIOLET",
    createdAt: new Date().toISOString()
  },
  {
    id: "demo-3",
    name: "WOTA-KING",
    score: 18700,
    hearts: 7,
    bestColor: "TURQUOISE",
    createdAt: new Date().toISOString()
  }
];

export const RankingPage = () => {
  const [entries, setEntries] = useState<RankingEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<Period>("all");
  const navigate = useNavigate();
  const t = useTranslation();
  const getColorName = useColorName();

  useEffect(() => {
    const fetchRanking = async () => {
      setLoading(true);
      const supabase = getSupabaseClient();
      if (!supabase) {
        await new Promise((resolve) => setTimeout(resolve, 300));
        setEntries(FALLBACK_ENTRIES);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("scores")
        .select("id, name, avatar, score, hearts, best_color, created_at")
        .order("score", { ascending: false })
        .limit(100);

      if (error || !data) {
        setEntries(FALLBACK_ENTRIES);
      } else {
        setEntries(
          data.map((row) => ({
            id: row.id,
            name: row.name,
            avatar: row.avatar,
            score: row.score,
            hearts: row.hearts,
            bestColor: (row.best_color as LightColor | null) ?? undefined,
            createdAt: row.created_at
          }))
        );
      }

      setLoading(false);
    };

    fetchRanking();
  }, [period]);

  return (
    <main className="relative min-h-screen overflow-hidden px-4 pb-16 pt-14">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,179,255,0.2),transparent_55%)]" />
      <div className="absolute top-4 right-4 z-20">
        <LanguageSwitcher />
      </div>
      <div className="relative z-10 mx-auto flex max-w-2xl flex-col gap-6">
        <header className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-display tracking-[0.3em] uppercase">{t("ranking")}</h1>
          <p className="text-sm text-white/70">{t("topScoreRanking")}</p>
        </header>

        <div className="flex justify-center gap-3 text-xs font-mono tracking-[0.4em] uppercase">
          <PeriodButton label="DAY" active={period === "day"} onClick={() => setPeriod("day")} />
          <PeriodButton label="WEEK" active={period === "week"} onClick={() => setPeriod("week")} />
          <PeriodButton label="ALL" active={period === "all"} onClick={() => setPeriod("all")} />
        </div>

        <div className="rounded-3xl border border-white/10 bg-black/30 backdrop-blur-xl">
          <div className="border-b border-white/5 px-6 py-3 text-xs font-mono tracking-[0.3em] text-white/60 uppercase">
            TOP {entries.length}
          </div>
          <div className="divide-y divide-white/5">
            {loading ? (
              <div className="p-6 text-center text-sm text-white/70">{t("loading")}</div>
            ) : (
              entries.map((entry, index) => <RankingRow key={entry.id} rank={index + 1} entry={entry} getColorName={getColorName} />)
            )}
          </div>
        </div>

        <button
          type="button"
          className="mx-auto rounded-full border border-white/20 bg-white/10 px-6 py-3 text-xs font-mono tracking-[0.4em] uppercase text-white/80"
          onClick={() => navigate("/")}
        >
          {t("backToTitleShort")}
        </button>
      </div>
    </main>
  );
};

type PeriodButtonProps = {
  label: string;
  active: boolean;
  onClick: () => void;
};

const PeriodButton = ({ label, active, onClick }: PeriodButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    className={`rounded-full border px-4 py-2 ${
      active ? "border-violet-400/60 bg-violet-500/30 text-white" : "border-white/15 bg-white/5 text-white/60"
    }`}
  >
    {label}
  </button>
);

type RankingRowProps = {
  rank: number;
  entry: RankingEntry;
  getColorName: (color: LightColor) => string;
};

const RankingRow = ({ rank, entry, getColorName }: RankingRowProps) => (
  <div className="flex items-center gap-4 px-6 py-4 text-sm">
    <div className="w-10 font-mono text-white/60">#{rank}</div>
    <div className="h-10 w-10 overflow-hidden rounded-full border border-white/10 bg-white/10">
      {entry.avatar ? (
        <img src={entry.avatar} alt={entry.name} className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-xs font-mono text-white/50">X</div>
      )}
    </div>
    <div className="flex flex-col">
      <span className="font-display tracking-[0.2em] text-white">{entry.name}</span>
      <span className="text-[11px] text-white/50 tracking-[0.3em] uppercase">
        {new Date(entry.createdAt).toLocaleDateString()}
      </span>
    </div>
    <div className="ml-auto flex flex-col items-end font-mono">
      <span className="text-white/80 tracking-[0.3em] text-sm">{entry.score.toLocaleString()}</span>
      <div className="flex items-center gap-2 text-[11px] text-white/50">
        <span>♡{entry.hearts}</span>
        {entry.bestColor && (
          <span className="flex items-center gap-1">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: COLOR_HEX[entry.bestColor] ?? "#fff" }}
            />
            {getColorName(entry.bestColor)}
          </span>
        )}
      </div>
    </div>
  </div>
);


