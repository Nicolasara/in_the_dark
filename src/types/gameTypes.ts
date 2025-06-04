import { GameMode } from "./gameModes";
import { GameOutcome } from "./winningConditions";

export interface Player {
  id: string;
  name: string;
  isInTheDark: boolean;
  goneThroughReveal: boolean;
  question?: string;
  answer?: string;
  votes: number;
  hasVoted: boolean;
  teamId?: string; // For team mode
  knowsSecret?: boolean;
}

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
