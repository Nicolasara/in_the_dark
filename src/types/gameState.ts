import { GameMode } from "./gameModes";
import { Player } from "./player";
import { GameOutcome } from "./winningConditions";

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

export interface GameState {
  players: Player[];
  currentPhase: GamePhase;
  gameMode: GameMode;
  outcomes: GameOutcome[];
  secret: string;
  round: number;
}
