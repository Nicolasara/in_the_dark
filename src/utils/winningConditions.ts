import { GameState, Player } from "../types/gameTypes";
import {
  GameOutcome,
  PlayerResult,
  PointResults,
} from "../types/winningConditions";

/**
 * Calculates the game outcomes based on the current game state.
 * This function determines the point results for each player in the dark
 * based on whether they were caught, their knowledge of the secret, and the game mode.
 */
export function calculateGameOutcomes(gameState: GameState): GameOutcome {
  const playersInTheDark = gameState.players.filter(
    (player) => player.isInTheDark
  );
  const inTheLoopPlayers = gameState.players.filter(
    (player) => !player.isInTheDark
  );

  // Find the player(s) with the most votes
  const maxVotes = Math.max(...gameState.players.map((p) => p.votes));
  const mostVotedPlayers = gameState.players.filter(
    (p) => p.votes === maxVotes && maxVotes > 0
  );
  const caughtIds = new Set(mostVotedPlayers.map((p) => p.id));

  // Prepare per-player points
  let inTheLoopPoints = 0;
  const inTheDarkPoints: Record<string, number> = {};

  // Determine if any in the dark player was caught
  const anyCaught = playersInTheDark.some((p) => caughtIds.has(p.id));

  // Assign points for each in the dark player
  for (const player of playersInTheDark) {
    const caughtByInTheLoop = caughtIds.has(player.id);
    const knowsSecret = player.answer === gameState.secret;
    let points = 0;

    if (caughtByInTheLoop) {
      if (knowsSecret) {
        // Tie: both sides get 1 point
        points = 1;
        inTheLoopPoints += 1;
      } else {
        // In the loop win: in the loop gets 1 point, in the dark gets 0
        points = 0;
        inTheLoopPoints += 1;
      }
    } else {
      if (knowsSecret) {
        // In the dark double win: in the dark gets 2 points
        points = 2;
      } else {
        // In the dark win: in the dark gets 1 point
        points = 1;
      }
    }
    inTheDarkPoints[player.id] = points;
  }

  // If any in the dark player was caught, others get half win (0.5)
  if (anyCaught) {
    for (const player of playersInTheDark) {
      if (!caughtIds.has(player.id)) {
        inTheDarkPoints[player.id] = 0.5;
      }
    }
  }

  // Build playerResults
  const playerResults: PlayerResult[] = playersInTheDark.map((player) => ({
    playerId: player.id,
    caughtByInTheLoop: caughtIds.has(player.id),
    knowsSecret: player.answer === gameState.secret,
    pointResults: {
      inTheLoopPoints,
      inTheDarkPoints: { ...inTheDarkPoints },
    },
  }));

  return { playerResults };
}
