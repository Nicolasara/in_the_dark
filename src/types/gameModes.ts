export type GameModeType = "single" | "team" | "individual";

export interface BaseGameMode {
  type: GameModeType;
  maxInTheDarkPlayers: number;
}

export interface SinglePlayerMode extends BaseGameMode {
  type: "single";
  maxInTheDarkPlayers: 1;
}

export interface TeamMode extends BaseGameMode {
  type: "team";
  knownTeammates: boolean;
  maxInTheDarkPlayers: number; // Calculated differently based on knownTeammates
}

export interface IndividualMode extends BaseGameMode {
  type: "individual";
  maxInTheDarkPlayers: number; // Calculated as ⌊total players / 2⌋
}

export type GameMode = SinglePlayerMode | TeamMode | IndividualMode;

export interface GameModeConfig {
  type: GameModeType;
  totalPlayers: number;
  knownTeammates?: boolean; // Only used for team mode
}

// Utility functions moved to src/utils/gameModes.ts
export {
  calculateMaxInTheDarkPlayers,
  createGameMode,
} from "../utils/gameModes";
