import { GameMode } from "./gameModes";
import { Player } from "./player";

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
  currentPlayerIndex: number;
  secret: string;
  mode: string;
  inTheDarkPlayers: number;
  totalPlayers: number;
  outcomes?: GameOutcome[];
}

export interface GameOutcome {
  type: "inTheDarkCaught" | "inTheDarkNotCaught";
  players: Player[];
}
