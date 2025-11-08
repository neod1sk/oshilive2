const TEMPLATES = [
  ({ score, correctCount }: ShareData) => `色合わせゲームで ${score} 点獲得！正解数 ${correctCount} 回！`,
  ({ correctCount }: ShareData) => `1分間で ${correctCount} 回正解！色合わせマスター！`,
  ({ score }: ShareData) => `スコア ${score.toLocaleString()} 点達成！🎉`
];

type ShareData = {
  score: number;
  correctCount: number;
  appUrl: string;
};

export const buildTweetIntent = ({ score, correctCount, appUrl }: ShareData) => {
  const textGenerator = TEMPLATES[Math.floor(Math.random() * TEMPLATES.length)];
  const text = textGenerator({ score, correctCount, appUrl });
  const params = new URLSearchParams({
    text,
    url: appUrl,
    hashtags: "推しライトLIVE"
  });
  return `https://twitter.com/intent/tweet?${params.toString()}`;
};



