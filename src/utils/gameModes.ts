import {
  GameMode,
  IndividualMode,
  GameModeType,
  TeamKnownMode,
  TeamUnknownMode,
  GameModeConfig,
} from "../types/gameModes";

export function calculateMaxInTheDarkPlayers(
  totalPlayers: number,
  type: GameModeType
): number {
  switch (type) {
    case "single":
      return 1;
    case "teamKnown":
      // If teammates know each other, we need more in the loop than in the dark
      return Math.floor((totalPlayers - 1) / 2);
    case "teamUnknown":
      // If teammates don't know each other, we can have equal numbers
      return Math.floor(totalPlayers / 2);
    case "individual":
      // For individual mode, we can have equal numbers
      return Math.floor(totalPlayers / 2);
  }
}

export function createGameMode(config: GameModeConfig): GameMode {
  const { type, totalPlayers, inTheDarkPlayers } = config;

  switch (type) {
    case "single":
      return {
        type,
        inTheDarkPlayers: 1,
      };

    case "teamKnown":
      const teamKnownMode: TeamKnownMode = {
        type,
        inTheDarkPlayers:
          inTheDarkPlayers ?? calculateMaxInTheDarkPlayers(totalPlayers, type),
      };
      return teamKnownMode;

    case "teamUnknown":
      const teamUnknownMode: TeamUnknownMode = {
        type,
        inTheDarkPlayers:
          inTheDarkPlayers ?? calculateMaxInTheDarkPlayers(totalPlayers, type),
      };
      return teamUnknownMode;

    case "individual":
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
