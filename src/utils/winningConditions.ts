import { GameState } from "../types/gameState";
import { Player } from "../types/player";
import {
  GameOutcome,
  PlayerResult,
  WinningResult,
} from "../types/winningConditions";

/**
 * Calculates the game outcomes based on the current game state.
 * This function determines the winning result for each player in the dark
 * based on whether they were caught, their knowledge of the secret, and the game mode.
 */
export function calculateGameOutcomes(gameState: GameState): GameOutcome {
  const playersInTheDark = gameState.players.filter(
    (player) => player.isInTheDark
  );

  // Find the player(s) with the most votes
  const maxVotes = Math.max(...gameState.players.map((p) => p.votes));
  const mostVotedPlayers = gameState.players.filter(
    (p) => p.votes === maxVotes && maxVotes > 0
  );
  const caughtIds = new Set(mostVotedPlayers.map((p) => p.id));

  // Determine if any in the dark player was caught
  const anyCaught = playersInTheDark.some((p) => caughtIds.has(p.id));

  // Determine game mode
  const mode = gameState.gameMode.type;

  // Assign winning result for each in the dark player
  const playerResults: PlayerResult[] = playersInTheDark.map((player) => {
    const caughtByInTheLoop = caughtIds.has(player.id);
    const knowsSecret = player.answer === gameState.secret;
    let winningResult: WinningResult;

    if (mode === "individual" && anyCaught) {
      if (caughtByInTheLoop) {
        winningResult = { type: "loss", points: 0 };
      } else if (knowsSecret) {
        winningResult = { type: "oneAndHalf", points: 1.5 };
      } else {
        winningResult = { type: "half", points: 0.5 };
      }
    } else {
      if (caughtByInTheLoop) {
        if (knowsSecret) {
          // Tie: both sides get 1 point
          winningResult = { type: "tie", points: 1 };
        } else {
          // In the loop win: in the loop gets 1 point, in the dark gets 0
          winningResult = { type: "loss", points: 0 };
        }
      } else {
        if (knowsSecret) {
          // In the dark double win: in the dark gets 2 points
          winningResult = { type: "double", points: 2 };
        } else {
          // In the dark win: in the dark gets 1 point
          winningResult = { type: "regular", points: 1 };
        }
      }
      // If any in the dark player was caught, others get half win (0.5) in team mode
      if (mode !== "individual" && anyCaught && !caughtByInTheLoop) {
        winningResult = { type: "half", points: 0.5 };
      }
    }

    return {
      playerId: player.id,
      caughtByInTheLoop,
      knowsSecret,
      winningResult,
    };
  });

  return { playerResults };
}
