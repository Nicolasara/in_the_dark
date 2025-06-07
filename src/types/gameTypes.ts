import { GameMode } from "./gameModes";
import { GameOutcome } from "./winningConditions";
import { Player } from "./player";

export interface GameState {
  players: Player[];
  currentPhase: GamePhase;
  gameMode: GameMode;
  outcomes: GameOutcome[];
  secret: string;
  round: number;
}

export type GamePhase =
  | "setup"
  | "reveal"
  | "questions"
  | "review"
  | "voting"
  | "voteResults"
  | "guessing"
  | "guessingResults"
  | "ended";
