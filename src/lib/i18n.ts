export type Language = "ja" | "ko" | "en";

export const translations = {
  ja: {
    // タイトル画面
    title: "推しライト",
    titleSub: "LIVE!!",
    phrases: [
      "推しにレスもらう準備はできた？",
      "色合わせ×リズムで沸き上がれ！",
      "センター読み勝ちで最前列へ"
    ],
    start: "START",
    settings: "設定 & 難易度",
    viewRanking: "ランキングを見る",
    
    // ゲーム画面
    remainingTime: "残り時間（秒）",
    score: "SCORE",
    correctCount: "正解数",
    targetColor: "お題カラー",
    current: "現在",
    off: "消灯",
    match: "一致！",
    correct: "正解！",
    points: "点",
    times: "回",
    seconds: "秒",
    
    // 結果画面
    otakuLevel: "オタクレベル",
    totalScore: "TOTAL SCORE",
    shareOnX: "X で共有する",
    viewRankingResult: "ランキングを見る",
    playAgain: "もう一度プレイ",
    backToTitle: "タイトルへ戻る",
    correctCountLabel: "正解数",
    scoreLabel: "スコア",
    
    // 設定画面
    settingsTitle: "Settings",
    difficulty: "難易度",
    inputMode: "入力方式",
    colorMode: "カラーモード補助",
    colorModeDesc: "色にパターンを付与して識別しやすく",
    showJudgement: "判定表示",
    showJudgementDesc: "PERFECT / GREAT / GOOD / MISS の表示",
    vibration: "バイブレーション",
    vibrationDesc: "PERFECT 時に軽く振動",
    shakeInput: "シェイク入力",
    shakeInputDesc: "端末の振り操作を有効化（実装予定）",
    judgementManual: "判定マニュアル",
    back: "戻る",
    
    // ランキング画面
    ranking: "Ranking",
    topScoreRanking: "トップスコアランキング",
    loading: "読み込み中...",
    backToTitleShort: "タイトルへ",
    
    // その他
    switchA: "スイッチA",
    switchB: "スイッチB",
    colorMatch: "色が一致しています！",
    earnScore: "色を合わせてスコアを稼ごう！",
    goToResult: "結果へ"
  },
  ko: {
    // タイトル画面
    title: "오시라이트",
    titleSub: "LIVE!!",
    phrases: [
      "오시에게 답장 받을 준비 됐어?",
      "색 맞추기×리듬으로 열광하자!",
      "센터 읽기 승리로 최전열로"
    ],
    start: "시작",
    settings: "설정 & 난이도",
    viewRanking: "랭킹 보기",
    
    // ゲーム画面
    remainingTime: "남은 시간（초）",
    score: "점수",
    correctCount: "정답 수",
    targetColor: "문제 색상",
    current: "현재",
    off: "꺼짐",
    match: "일치!",
    correct: "정답!",
    points: "점",
    times: "회",
    seconds: "초",
    
    // 結果画面
    otakuLevel: "오타쿠 레벨",
    totalScore: "총 점수",
    shareOnX: "X에서 공유하기",
    viewRankingResult: "랭킹 보기",
    playAgain: "다시 플레이",
    backToTitle: "타이틀로 돌아가기",
    correctCountLabel: "정답 수",
    scoreLabel: "점수",
    
    // 設定画面
    settingsTitle: "설정",
    difficulty: "난이도",
    inputMode: "입력 방식",
    colorMode: "색상 모드 보조",
    colorModeDesc: "색상에 패턴을 부여하여 식별하기 쉽게",
    showJudgement: "판정 표시",
    showJudgementDesc: "PERFECT / GREAT / GOOD / MISS 표시",
    vibration: "진동",
    vibrationDesc: "PERFECT 시 경미한 진동",
    shakeInput: "흔들기 입력",
    shakeInputDesc: "기기 흔들기 조작 활성화（구현 예정）",
    judgementManual: "판정 매뉴얼",
    back: "돌아가기",
    
    // ランキング画面
    ranking: "랭킹",
    topScoreRanking: "톱 스코어 랭킹",
    loading: "로딩 중...",
    backToTitleShort: "타이틀로",
    
    // その他
    switchA: "스위치A",
    switchB: "스위치B",
    colorMatch: "색상이 일치합니다!",
    earnScore: "색을 맞춰서 점수를 획득하자!",
    goToResult: "결과로"
  },
  en: {
    // タイトル画面
    title: "Oshi Light",
    titleSub: "LIVE!!",
    phrases: [
      "Ready to get a reply from your oshi?",
      "Get hyped with color matching × rhythm!",
      "Win with center reading to the front row"
    ],
    start: "START",
    settings: "Settings & Difficulty",
    viewRanking: "View Ranking",
    
    // ゲーム画面
    remainingTime: "Time Remaining (sec)",
    score: "SCORE",
    correctCount: "Correct",
    targetColor: "Target Color",
    current: "Current",
    off: "Off",
    match: "Match!",
    correct: "Correct!",
    points: "pts",
    times: "times",
    seconds: "sec",
    
    // 結果画面
    otakuLevel: "Otaku Level",
    totalScore: "TOTAL SCORE",
    shareOnX: "Share on X",
    viewRankingResult: "View Ranking",
    playAgain: "Play Again",
    backToTitle: "Back to Title",
    correctCountLabel: "Correct",
    scoreLabel: "Score",
    
    // 設定画面
    settingsTitle: "Settings",
    difficulty: "Difficulty",
    inputMode: "Input Mode",
    colorMode: "Color Mode Assist",
    colorModeDesc: "Add patterns to colors for easier identification",
    showJudgement: "Show Judgement",
    showJudgementDesc: "Display PERFECT / GREAT / GOOD / MISS",
    vibration: "Vibration",
    vibrationDesc: "Light vibration on PERFECT",
    shakeInput: "Shake Input",
    shakeInputDesc: "Enable device shake operation (planned)",
    judgementManual: "Judgement Manual",
    back: "Back",
    
    // ランキング画面
    ranking: "Ranking",
    topScoreRanking: "Top Score Ranking",
    loading: "Loading...",
    backToTitleShort: "To Title",
    
    // その他
    switchA: "Switch A",
    switchB: "Switch B",
    colorMatch: "Color matched!",
    earnScore: "Match colors to earn score!",
    goToResult: "To Result"
  }
} as const;

export type TranslationKey = keyof typeof translations.ja;

