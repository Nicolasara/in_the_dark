import { GameState } from "./gameTypes";

export interface PointResults {
  inTheLoopPoints: number;
  inTheDarkPoints: Record<string, number>; // playerId -> points
  // Optionally, add a description or notes field for clarity in test data
}

export interface PlayerResult {
  playerId: string;
  caughtByInTheLoop: boolean;
  knowsSecret: boolean;
  pointResults: PointResults;
}

export interface GameOutcome {
  // Track results for each player in the dark
  playerResults: PlayerResult[];
}
