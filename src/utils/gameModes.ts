import {
  GameMode,
  IndividualMode,
  GameModeType,
  TeamKnownMode,
  TeamUnknownMode,
  GameModeConfig,
  GAME_MODES,
} from "../types/gameModes";

export function calculateMaxInTheDarkPlayers(
  totalPlayers: number,
  type: GameModeType
): number {
  switch (type) {
    case GAME_MODES.SINGLE:
      return 1;
    case GAME_MODES.TEAM_KNOWN:
      // If teammates know each other, we need more in the loop than in the dark
      return Math.floor((totalPlayers - 1) / 2);
    case GAME_MODES.TEAM_UNKNOWN:
      // If teammates don't know each other, we can have equal numbers
      return Math.floor(totalPlayers / 2);
    case GAME_MODES.INDIVIDUAL:
      // For individual mode, we can have equal numbers
      return Math.floor(totalPlayers / 2);
  }
}

export function createGameMode(config: GameModeConfig): GameMode {
  const { type, totalPlayers, inTheDarkPlayers } = config;

  switch (type) {
    case GAME_MODES.SINGLE:
      return {
        type,
        inTheDarkPlayers: 1,
      };

    case GAME_MODES.TEAM_KNOWN:
      const teamKnownMode: TeamKnownMode = {
        type,
        inTheDarkPlayers:
          inTheDarkPlayers ?? calculateMaxInTheDarkPlayers(totalPlayers, type),
      };
      return teamKnownMode;

    case GAME_MODES.TEAM_UNKNOWN:
      const teamUnknownMode: TeamUnknownMode = {
        type,
        inTheDarkPlayers:
          inTheDarkPlayers ?? calculateMaxInTheDarkPlayers(totalPlayers, type),
      };
      return teamUnknownMode;

    case GAME_MODES.INDIVIDUAL:
      const individualMode: IndividualMode = {
        type,
        inTheDarkPlayers:
          inTheDarkPlayers ?? calculateMaxInTheDarkPlayers(totalPlayers, type),
      };
      return individualMode;

    default:
      throw new Error(`Invalid game mode type: ${type}`);
  }
}
