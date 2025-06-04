import {
  GameMode,
  GameModeConfig,
  TeamMode,
  IndividualMode,
} from "../types/gameModes";

export function calculateMaxInTheDarkPlayers(
  totalPlayers: number,
  gameMode: GameMode
): number {
  switch (gameMode.type) {
    case "single":
      return 1;
    case "team":
      // If teammates know each other, we need more in the loop than in the dark
      if ((gameMode as TeamMode).knownTeammates) {
        return Math.floor((totalPlayers - 1) / 2);
      }
      // If teammates don't know each other, we can have equal numbers
      return Math.floor(totalPlayers / 2);
    case "individual":
      // For individual mode, we can have equal numbers
      return Math.floor(totalPlayers / 2);
  }
}

export function createGameMode(config: GameModeConfig): GameMode {
  const { type, totalPlayers, knownTeammates } = config;

  switch (type) {
    case "single":
      return {
        type: "single",
        maxInTheDarkPlayers: 1,
      };

    case "team":
      if (knownTeammates === undefined) {
        throw new Error("knownTeammates must be specified for team mode");
      }
      const teamMode: TeamMode = {
        type: "team",
        knownTeammates,
        maxInTheDarkPlayers: 0, // Will be calculated
      };
      teamMode.maxInTheDarkPlayers = calculateMaxInTheDarkPlayers(
        totalPlayers,
        teamMode
      );
      return teamMode;

    case "individual":
      const individualMode: IndividualMode = {
        type: "individual",
        maxInTheDarkPlayers: 0, // Will be calculated
      };
      individualMode.maxInTheDarkPlayers = calculateMaxInTheDarkPlayers(
        totalPlayers,
        individualMode
      );
      return individualMode;

    default:
      throw new Error(`Invalid game mode type: ${type}`);
  }
}
