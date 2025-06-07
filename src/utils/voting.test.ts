import { analyzeVotingResults } from "./voting";
import { Player } from "../types/player";

describe("analyzeVotingResults", () => {
  const createPlayer = (
    name: string,
    isInTheDark: boolean,
    votes: number
  ): Player => ({
    id: name.toLowerCase(),
    name,
    isInTheDark,
    goneThroughReveal: true,
    votes,
    hasVoted: true,
    knowsSecret: !isInTheDark,
    hasSeenItem: true,
  });

  describe("No tie scenarios", () => {
    it("should correctly identify when in the dark player gets most votes", () => {
      const players = [
        createPlayer("Alice", true, 3), // In the dark, most votes
        createPlayer("Bob", false, 1), // In the loop
        createPlayer("Charlie", false, 1), // In the loop
      ];

      const result = analyzeVotingResults(players);

      expect(result.isTie).toBe(false);
      expect(result.wasCorrectlyIdentified).toBe(true);
      expect(result.tieBreakWinner).toBe("inTheLoop");
      expect(result.mostVotedPlayers).toHaveLength(1);
      expect(result.mostVotedPlayers[0].name).toBe("Alice");
    });

    it("should correctly identify when in the loop player gets most votes", () => {
      const players = [
        createPlayer("Alice", true, 1), // In the dark
        createPlayer("Bob", false, 3), // In the loop, most votes
        createPlayer("Charlie", false, 1), // In the loop
      ];

      const result = analyzeVotingResults(players);

      expect(result.isTie).toBe(false);
      expect(result.wasCorrectlyIdentified).toBe(false);
      expect(result.tieBreakWinner).toBe("inTheDark");
      expect(result.mostVotedPlayers).toHaveLength(1);
      expect(result.mostVotedPlayers[0].name).toBe("Bob");
    });
  });

  describe("Tie scenarios", () => {
    it("should handle tie between all in the dark players (in the loop wins)", () => {
      const players = [
        createPlayer("Alice", true, 2), // In the dark, tied
        createPlayer("Bob", true, 2), // In the dark, tied
        createPlayer("Charlie", false, 1), // In the loop
        createPlayer("David", false, 1), // In the loop
      ];

      const result = analyzeVotingResults(players);

      expect(result.isTie).toBe(true);
      expect(result.wasCorrectlyIdentified).toBe(true);
      expect(result.tieBreakWinner).toBe("inTheLoop");
      expect(result.mostVotedPlayers).toHaveLength(2);
      expect(result.mostVotedPlayers.every((p) => p.isInTheDark)).toBe(true);
    });

    it("should handle tie between all in the loop players (in the dark wins)", () => {
      const players = [
        createPlayer("Alice", true, 1), // In the dark
        createPlayer("Bob", false, 2), // In the loop, tied
        createPlayer("Charlie", false, 2), // In the loop, tied
        createPlayer("David", false, 1), // In the loop
      ];

      const result = analyzeVotingResults(players);

      expect(result.isTie).toBe(true);
      expect(result.wasCorrectlyIdentified).toBe(false);
      expect(result.tieBreakWinner).toBe("inTheDark");
      expect(result.mostVotedPlayers).toHaveLength(2);
      expect(result.mostVotedPlayers.every((p) => !p.isInTheDark)).toBe(true);
    });

    it("should handle mixed tie (some in dark, some in loop)", () => {
      const players = [
        createPlayer("Alice", true, 2), // In the dark, tied
        createPlayer("Bob", false, 2), // In the loop, tied
        createPlayer("Charlie", false, 1), // In the loop
        createPlayer("David", true, 1), // In the dark
      ];

      const result = analyzeVotingResults(players);

      expect(result.isTie).toBe(true);
      expect(result.wasCorrectlyIdentified).toBe(true); // Some in the dark were identified
      expect(result.tieBreakWinner).toBe("trueTie");
      expect(result.mostVotedPlayers).toHaveLength(2);
      expect(result.mostVotedPlayers.some((p) => p.isInTheDark)).toBe(true);
      expect(result.mostVotedPlayers.some((p) => !p.isInTheDark)).toBe(true);
    });

    it("should handle three-way tie with all in the dark", () => {
      const players = [
        createPlayer("Alice", true, 2), // In the dark, tied
        createPlayer("Bob", true, 2), // In the dark, tied
        createPlayer("Charlie", true, 2), // In the dark, tied
        createPlayer("David", false, 1), // In the loop
      ];

      const result = analyzeVotingResults(players);

      expect(result.isTie).toBe(true);
      expect(result.wasCorrectlyIdentified).toBe(true);
      expect(result.tieBreakWinner).toBe("inTheLoop");
      expect(result.mostVotedPlayers).toHaveLength(3);
      expect(result.mostVotedPlayers.every((p) => p.isInTheDark)).toBe(true);
    });
  });

  describe("Edge cases", () => {
    it("should handle no votes scenario", () => {
      const players = [
        createPlayer("Alice", true, 0),
        createPlayer("Bob", false, 0),
      ];

      const result = analyzeVotingResults(players);

      expect(result.mostVotedPlayers).toHaveLength(0); // No votes cast
      expect(result.isTie).toBe(false);
    });

    it("should handle single player scenario", () => {
      const players = [createPlayer("Alice", true, 1)];

      const result = analyzeVotingResults(players);

      expect(result.isTie).toBe(false);
      expect(result.wasCorrectlyIdentified).toBe(true);
      expect(result.tieBreakWinner).toBe("inTheLoop");
    });
  });
});
