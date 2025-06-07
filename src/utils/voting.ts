import { Player } from "../types/player";

/**
 * Finds the player(s) with the most votes
 * @param players Array of players with vote counts
 * @returns Array of players with the highest vote count
 */
export function getMostVotedPlayers(players: Player[]): Player[] {
  if (players.length === 0) return [];

  const maxVotes = Math.max(...players.map((player) => player.votes));
  return players.filter((player) => player.votes === maxVotes && maxVotes > 0);
}

/**
 * Finds the single player with the most votes (first one if tied)
 * @param players Array of players with vote counts
 * @returns The player with the most votes, or first player if no votes
 */
export function getMostVotedPlayer(players: Player[]): Player {
  if (players.length === 0) throw new Error("No players provided");

  return players.reduce((prev, current) =>
    current.votes > prev.votes ? current : prev
  );
}

/**
 * Analyzes the voting results to determine if players correctly identified those in the dark
 * @param players Array of all players
 * @returns Object with detailed identification results
 */
export function analyzeVotingResults(players: Player[]): {
  mostVotedPlayers: Player[];
  wasCorrectlyIdentified: boolean;
  isTie: boolean;
  tieBreakWinner: "inTheDark" | "inTheLoop" | "trueTie";
} {
  const mostVotedPlayers = getMostVotedPlayers(players);
  const isTie = mostVotedPlayers.length > 1;

  // Determine if voting correctly identified players in the dark
  let wasCorrectlyIdentified: boolean;
  let tieBreakWinner: "inTheDark" | "inTheLoop" | "trueTie";

  if (!isTie) {
    // No tie - simple case (or no votes cast)
    if (mostVotedPlayers.length === 0) {
      // No votes cast - default to "in the dark" team wins
      wasCorrectlyIdentified = false;
      tieBreakWinner = "inTheDark";
    } else {
      wasCorrectlyIdentified = mostVotedPlayers[0].isInTheDark;
      tieBreakWinner = wasCorrectlyIdentified ? "inTheLoop" : "inTheDark";
    }
  } else {
    // There's a tie - analyze who the tied players are
    const tiedInTheDark = mostVotedPlayers.filter(
      (player) => player.isInTheDark
    );
    const tiedInTheLoop = mostVotedPlayers.filter(
      (player) => !player.isInTheDark
    );

    if (tiedInTheDark.length === mostVotedPlayers.length) {
      // All tied players are in the dark - "In the loop" team wins
      wasCorrectlyIdentified = true;
      tieBreakWinner = "inTheLoop";
    } else if (tiedInTheLoop.length === mostVotedPlayers.length) {
      // All tied players are in the loop - "In the dark" team wins
      wasCorrectlyIdentified = false;
      tieBreakWinner = "inTheDark";
    } else {
      // Mixed tie (some in the dark, some in the loop) - partial success
      wasCorrectlyIdentified = true; // Some players in the dark were identified
      tieBreakWinner = "trueTie";
    }
  }

  return {
    mostVotedPlayers,
    wasCorrectlyIdentified,
    isTie,
    tieBreakWinner,
  };
}
