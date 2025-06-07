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
 * Checks if the voting correctly identified players in the dark
 * @param players Array of all players
 * @returns Object with identification results
 */
export function analyzeVotingResults(players: Player[]): {
  mostVotedPlayers: Player[];
  wasCorrectlyIdentified: boolean;
  isTie: boolean;
} {
  const mostVotedPlayers = getMostVotedPlayers(players);
  const wasCorrectlyIdentified = mostVotedPlayers.some(
    (player) => player.isInTheDark
  );
  const isTie = mostVotedPlayers.length > 1;

  return {
    mostVotedPlayers,
    wasCorrectlyIdentified,
    isTie,
  };
}
