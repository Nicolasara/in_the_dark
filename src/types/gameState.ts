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

// Game phase constants for better consistency
export const GAME_PHASES = {
  SETUP: "setup" as const,
  REVEAL: "reveal" as const,
  QUESTIONS: "questions" as const,
  REVIEW: "review" as const,
  VOTING: "voting" as const,
  VOTE_RESULTS: "voteResults" as const,
  GUESSING: "guessing" as const,
  GUESSING_RESULTS: "guessingResults" as const,
  ENDED: "ended" as const,
};

export interface GameState {
  players: Player[];
  currentPhase: GamePhase;
  gameMode: GameMode;
  outcomes: GameOutcome[];
  secret: string;
  round: number;
}
