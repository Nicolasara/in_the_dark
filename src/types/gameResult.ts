export const GAME_RESULTS = {
  IN_THE_LOOP: "inTheLoop" as const,
  IN_THE_DARK: "inTheDark" as const,
  TIE: "tie" as const,
} as const;

export type GameResult = (typeof GAME_RESULTS)[keyof typeof GAME_RESULTS];
