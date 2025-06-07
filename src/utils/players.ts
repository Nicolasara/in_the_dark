import { Player } from "../types/player";
import { GameMode } from "../types/gameModes";

/**
 * Generates an array of starting Player objects for a new game.
 * @param gameMode The game mode object (with type and maxInTheDarkPlayers)
 * @param names array of player names
 * @param inTheDarkCount Optional: number of players in the dark (defaults to gameMode.maxInTheDarkPlayers)
 */
export function generateStartingPlayers(
  gameMode: GameMode,
  names: string[],
  inTheDarkCount?: number
): Player[] {
  const totalPlayers = names.length;
  const players: Player[] = [];
  const numInTheDark = inTheDarkCount ?? gameMode.inTheDarkPlayers;
  const shuffledNames = shuffleArray([...names]);

  // Fill in names if not enough provided
  for (let i = shuffledNames.length; i < totalPlayers; i++) {
    shuffledNames.push(`Player ${i + 1}`);
  }

  // Assign in the dark players (first N after shuffle)
  for (let i = 0; i < totalPlayers; i++) {
    const isInTheDark = i < numInTheDark;
    players.push({
      id: `player${i + 1}`,
      name: shuffledNames[i],
      isInTheDark,
      goneThroughReveal: false,
      votes: 0,
      hasVoted: false,
      knowsSecret: false,
      hasSeenItem: false,
    });
  }

  return players;
}

/**
 * Shuffles an array in place using Fisher-Yates algorithm.
 */
export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Filters and returns only the players who are "in the dark"
 * @param players Array of players
 * @returns Array of players who are in the dark
 */
export function getPlayersInTheDark(players: Player[]): Player[] {
  return players.filter((player) => player.isInTheDark);
}

/**
 * Filters and returns only the players who are "in the loop"
 * @param players Array of players
 * @returns Array of players who are in the loop
 */
export function getPlayersInTheLoop(players: Player[]): Player[] {
  return players.filter((player) => !player.isInTheDark);
}
