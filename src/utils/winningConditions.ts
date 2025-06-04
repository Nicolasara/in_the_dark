import { GameState, Player } from "../types/gameTypes";
import {
  GameOutcome,
  PlayerResult,
  WinningResult,
  HalfWin,
} from "../types/winningConditions";

/**
 * Calculates the game outcomes based on the current game state.
 * This function determines the winning results for each player in the dark
 * based on whether they were caught, their knowledge of the secret, and the game mode.
 */
export function calculateGameOutcomes(gameState: GameState): GameOutcome {
  const playersInTheDark = gameState.players.filter(
    (player) => player.isInTheDark
  );
  const playerResults: PlayerResult[] = [];

  // Find the player with the most votes
  const mostVotedPlayer = gameState.players.reduce((prev, current) =>
    current.votes > prev.votes ? current : prev
  );

  // For each player in the dark, calculate their individual result
  for (const player of playersInTheDark) {
    const caughtByInTheLoop = player.id === mostVotedPlayer.id;
    const knowsSecret = player.answer === gameState.secret;

    let winningResult: WinningResult;

    if (caughtByInTheLoop) {
      if (knowsSecret) {
        winningResult = { type: "tie", points: 1 };
      } else {
        winningResult = { type: "loss", points: 0 };
      }
    } else {
      if (knowsSecret) {
        winningResult = { type: "double", points: 2 };
      } else {
        winningResult = { type: "regular", points: 1 };
      }
    }

    playerResults.push({
      playerId: player.id,
      caughtByInTheLoop,
      knowsSecret,
      winningResult,
    });
  }

  // If any player in the dark was caught, other players in the dark get half wins
  if (playerResults.some((result) => result.caughtByInTheLoop)) {
    playerResults.forEach((result) => {
      if (!result.caughtByInTheLoop) {
        const halfWin: HalfWin = { type: "half", points: 0.5 };
        result.winningResult = halfWin;
      }
    });
  }

  return { playerResults };
}
