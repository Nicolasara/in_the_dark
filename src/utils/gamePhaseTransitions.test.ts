import { Player } from "../types/player";

// Mock the logic from GameScreen's handlePlayerComplete for guessing phase
function simulateGuessingPhaseTransition(
  players: Player[],
  currentPlayerIndex: number,
  gameMode: "single" | "teamKnown" | "teamUnknown" | "individual" = "individual"
): { shouldCompletePhase: boolean; nextPlayerIndex: number | null } {
  const isTeamMode = gameMode === "teamKnown" || gameMode === "teamUnknown";

  if (isTeamMode) {
    // Team mode: All players in the dark make one collective guess
    // Once any player makes a guess, the phase is complete
    return { shouldCompletePhase: true, nextPlayerIndex: null };
  }

  // Individual/Single mode: Each player gets their own turn
  const playersInTheDark = players.filter((player) => player.isInTheDark);
  const playersWithGuesses = playersInTheDark.filter((player) => player.answer);

  if (playersWithGuesses.length >= playersInTheDark.length) {
    // All players in the dark have made their guess, move to next phase
    return { shouldCompletePhase: true, nextPlayerIndex: null };
  }

  // Find the next player who is in the dark and hasn't made a guess yet
  let nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
  while (nextPlayerIndex !== currentPlayerIndex) {
    const nextPlayer = players[nextPlayerIndex];
    if (nextPlayer.isInTheDark && !nextPlayer.answer) {
      return { shouldCompletePhase: false, nextPlayerIndex };
    }
    nextPlayerIndex = (nextPlayerIndex + 1) % players.length;
  }
  // If we've gone through all players and couldn't find one without a guess, move to next phase
  return { shouldCompletePhase: true, nextPlayerIndex: null };
}

describe("Guessing Phase Transitions", () => {
  const createPlayer = (
    name: string,
    isInTheDark: boolean,
    answer?: string
  ): Player => ({
    id: name.toLowerCase(),
    name,
    isInTheDark,
    goneThroughReveal: true,
    votes: 0,
    hasVoted: true,
    knowsSecret: !isInTheDark,
    hasSeenItem: true,
    answer,
  });

  describe("Single player mode", () => {
    it("should complete phase when single dark player makes guess", () => {
      const players = [
        createPlayer("Alice", true, "ice cream"), // Made guess
        createPlayer("Bob", false),
        createPlayer("Charlie", false),
      ];

      const result = simulateGuessingPhaseTransition(players, 0);

      expect(result.shouldCompletePhase).toBe(true);
      expect(result.nextPlayerIndex).toBe(null);
    });

    it("should stay in phase when single dark player hasn't guessed", () => {
      const players = [
        createPlayer("Alice", true), // No guess yet
        createPlayer("Bob", false),
        createPlayer("Charlie", false),
      ];

      const result = simulateGuessingPhaseTransition(players, 1);

      expect(result.shouldCompletePhase).toBe(false);
      expect(result.nextPlayerIndex).toBe(0); // Should go to Alice
    });
  });

  describe("Multiple players in dark", () => {
    it("should continue when only some players have guessed", () => {
      const players = [
        createPlayer("Alice", true, "ice cream"), // Made guess
        createPlayer("Bob", true), // No guess yet
        createPlayer("Charlie", false),
        createPlayer("David", false),
      ];

      const result = simulateGuessingPhaseTransition(players, 0);

      expect(result.shouldCompletePhase).toBe(false);
      expect(result.nextPlayerIndex).toBe(1); // Should go to Bob
    });

    it("should complete phase when all dark players have guessed", () => {
      const players = [
        createPlayer("Alice", true, "ice cream"), // Made guess
        createPlayer("Bob", true, "pizza"), // Made guess
        createPlayer("Charlie", false),
        createPlayer("David", false),
      ];

      const result = simulateGuessingPhaseTransition(players, 0);

      expect(result.shouldCompletePhase).toBe(true);
      expect(result.nextPlayerIndex).toBe(null);
    });

    it("should handle cycling through players correctly", () => {
      const players = [
        createPlayer("Alice", true, "ice cream"), // Made guess
        createPlayer("Bob", false), // Not in dark
        createPlayer("Charlie", true), // No guess yet
        createPlayer("David", false), // Not in dark
      ];

      const result = simulateGuessingPhaseTransition(players, 0);

      expect(result.shouldCompletePhase).toBe(false);
      expect(result.nextPlayerIndex).toBe(2); // Should go to Charlie
    });

    it("should complete phase when starting from last player and all have guessed", () => {
      const players = [
        createPlayer("Alice", true, "ice cream"), // Made guess
        createPlayer("Bob", true, "pizza"), // Made guess
        createPlayer("Charlie", false),
        createPlayer("David", false),
      ];

      const result = simulateGuessingPhaseTransition(players, 3);

      expect(result.shouldCompletePhase).toBe(true);
      expect(result.nextPlayerIndex).toBe(null);
    });
  });

  describe("Team mode guessing", () => {
    it("should complete phase immediately in team known mode", () => {
      const players = [
        createPlayer("Alice", true), // No guess yet
        createPlayer("Bob", true), // No guess yet
        createPlayer("Charlie", false),
        createPlayer("David", false),
      ];

      const result = simulateGuessingPhaseTransition(players, 0, "teamKnown");

      expect(result.shouldCompletePhase).toBe(true);
      expect(result.nextPlayerIndex).toBe(null);
    });

    it("should complete phase immediately in team unknown mode", () => {
      const players = [
        createPlayer("Alice", true), // No guess yet
        createPlayer("Bob", true), // No guess yet
        createPlayer("Charlie", false),
        createPlayer("David", false),
      ];

      const result = simulateGuessingPhaseTransition(players, 0, "teamUnknown");

      expect(result.shouldCompletePhase).toBe(true);
      expect(result.nextPlayerIndex).toBe(null);
    });
  });

  describe("Edge cases", () => {
    it("should handle case where no players are in the dark", () => {
      const players = [
        createPlayer("Alice", false),
        createPlayer("Bob", false),
        createPlayer("Charlie", false),
      ];

      const result = simulateGuessingPhaseTransition(players, 0);

      expect(result.shouldCompletePhase).toBe(true);
      expect(result.nextPlayerIndex).toBe(null);
    });

    it("should not get stuck in infinite loop with three dark players in individual mode", () => {
      const players = [
        createPlayer("Alice", true), // No guess
        createPlayer("Bob", true), // No guess
        createPlayer("Charlie", true), // No guess
        createPlayer("David", false),
      ];

      // Simulate multiple transitions
      let currentIndex = 0;
      let transitions = 0;
      const maxTransitions = 10; // Safety check

      while (transitions < maxTransitions) {
        const result = simulateGuessingPhaseTransition(
          players,
          currentIndex,
          "individual"
        );

        if (result.shouldCompletePhase) {
          break; // Should not complete until all have guessed
        }

        expect(result.nextPlayerIndex).not.toBeNull();
        currentIndex = result.nextPlayerIndex!;
        transitions++;

        // Simulate a player making a guess after their turn
        if (transitions === 1) players[0].answer = "guess1";
        if (transitions === 2) players[1].answer = "guess2";
        if (transitions === 3) players[2].answer = "guess3";
      }

      expect(transitions).toBeLessThan(maxTransitions);
    });
  });
});
