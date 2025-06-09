// Game mode constants for better type safety and consistency
export const GAME_MODES = {
  SINGLE: "single" as const,
  TEAM_KNOWN: "teamKnown" as const,
  TEAM_UNKNOWN: "teamUnknown" as const,
  INDIVIDUAL: "individual" as const,
};

export type GameModeType =
  | "single"
  | "teamKnown"
  | "teamUnknown"
  | "individual";

export interface BaseGameMode {
  type: GameModeType;
  inTheDarkPlayers: number;
}

export interface SinglePlayerMode extends BaseGameMode {
  type: "single";
  inTheDarkPlayers: 1; // Single player mode always has exactly 1 in-the-dark player
}

export interface TeamKnownMode extends BaseGameMode {
  type: "teamKnown";
  inTheDarkPlayers: number; // Number of players in the dark (max is calculated based on knownTeammates)
}

export interface TeamUnknownMode extends BaseGameMode {
  type: "teamUnknown";
  inTheDarkPlayers: number; // Number of players in the dark (max is calculated based on knownTeammates)
}

export interface IndividualMode extends BaseGameMode {
  type: "individual";
  inTheDarkPlayers: number; // Number of players in the dark (max is typically ⌊total players / 2⌋)
}

export type GameMode =
  | SinglePlayerMode
  | TeamKnownMode
  | TeamUnknownMode
  | IndividualMode;

export interface GameModeConfig {
  type: GameModeType;
  totalPlayers: number;
  inTheDarkPlayers?: number; // Not used for single player mode
}
