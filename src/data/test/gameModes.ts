import { GameModeConfig } from "../../types/gameModes";

/**
 * All game mode test data below is correctly formatted and represents valid configurations
 * according to the rules described in the project documentation.
 *
 * The minimum number of players for single in the dark mode is three.
 * The minimum number of players for team or individual mode (multiple in the dark) is four.
 *
 * If you need to test invalid or impossible configurations (for negative/failure tests),
 * add them in the "Incorrectly Formatted GameMode Data" section at the bottom of this file.
 */

// --- Correctly Formatted GameMode Data ---

// Single player in the dark (minimum valid)
export const gameModeSingleInTheDark3Players: GameModeConfig = {
  type: "single",
  totalPlayers: 3,
};

// Single player in the dark (larger group)
export const gameModeSingleInTheDark6Players: GameModeConfig = {
  type: "single",
  totalPlayers: 6,
};

// Team mode, known teammates (minimum valid)
export const gameModeTeamKnown4Players: GameModeConfig = {
  type: "teamKnown",
  totalPlayers: 4,
};

// Team mode, known teammates (larger group)
export const gameModeTeamKnown6Players: GameModeConfig = {
  type: "teamKnown",
  totalPlayers: 6,
};

// Team mode, unknown teammates (minimum valid)
export const gameModeTeamUnknown4Players: GameModeConfig = {
  type: "teamUnknown",
  totalPlayers: 4,
};

// Team mode, unknown teammates (larger group)
export const gameModeTeamUnknown6Players: GameModeConfig = {
  type: "teamUnknown",
  totalPlayers: 6,
};

// Individual mode (minimum valid)
export const gameModeIndividual4Players: GameModeConfig = {
  type: "individual",
  totalPlayers: 4,
};

// Individual mode (larger group)
export const gameModeIndividual6Players: GameModeConfig = {
  type: "individual",
  totalPlayers: 6,
};

/**
 * Incorrectly Formatted GameMode Data (for negative/failure tests)
 *
 * Add any GameModeConfig objects here that intentionally violate the game rules.
 * These are useful for testing error handling and validation logic.
 */
// Example:
// export const gameModeInvalid3PlayersTeam: GameModeConfig = {
//   type: "team",
//   totalPlayers: 3, // Invalid: less than minimum for team mode
//   knownTeammates: true,
// };
