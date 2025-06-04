export type WinType = "double" | "regular" | "half" | "tie" | "loss";

export interface BaseWinningResult {
  type: WinType;
  points: number;
}

export interface DoubleWin extends BaseWinningResult {
  type: "double";
  points: 2;
}

export interface RegularWin extends BaseWinningResult {
  type: "regular";
  points: 1;
}

export interface HalfWin extends BaseWinningResult {
  type: "half";
  points: 0.5;
}

export interface Tie extends BaseWinningResult {
  type: "tie";
  points: 1;
}

export interface Loss extends BaseWinningResult {
  type: "loss";
  points: 0;
}

export type WinningResult = DoubleWin | RegularWin | HalfWin | Tie | Loss;

export interface PlayerResult {
  playerId: string;
  caughtByInTheLoop: boolean;
  knowsSecret: boolean;
  winningResult: WinningResult;
}

export interface GameOutcome {
  // Track results for each player in the dark
  playerResults: PlayerResult[];
}
