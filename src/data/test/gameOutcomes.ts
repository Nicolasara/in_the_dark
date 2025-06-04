import { GameOutcome } from "../../types/winningConditions";

/**
 * All game outcome test data below is correctly formatted and represents valid scenarios
 * according to the rules described in the project documentation.
 *
 * If you need to test invalid or impossible outcomes (for negative/failure tests),
 * add them in the "Incorrectly Formatted GameOutcome Data" section at the bottom of this file.
 */

// --- Correctly Formatted GameOutcome Data ---

// Single in the dark, not caught, knows secret (In The Dark Double Win)
export const outcomeSingleInTheDarkDoubleWin: GameOutcome = {
  playerResults: [
    {
      playerId: "inTheDark1",
      caughtByInTheLoop: false,
      knowsSecret: true,
      winningResult: { type: "double", points: 2 },
    },
  ],
};

// Single in the dark, not caught, doesn't know secret (In The Dark Win)
export const outcomeSingleInTheDarkWin: GameOutcome = {
  playerResults: [
    {
      playerId: "inTheDark1",
      caughtByInTheLoop: false,
      knowsSecret: false,
      winningResult: { type: "regular", points: 1 },
    },
  ],
};

// Single in the dark, caught, knows secret (Tie)
export const outcomeSingleInTheDarkTie: GameOutcome = {
  playerResults: [
    {
      playerId: "inTheDark1",
      caughtByInTheLoop: true,
      knowsSecret: true,
      winningResult: { type: "tie", points: 1 },
    },
  ],
};

// Single in the dark, caught, doesn't know secret (In The Loop Win)
export const outcomeSingleInTheLoopWin: GameOutcome = {
  playerResults: [
    {
      playerId: "inTheDark1",
      caughtByInTheLoop: true,
      knowsSecret: false,
      winningResult: { type: "loss", points: 0 },
    },
  ],
};

// TEAM MODE: both not caught, both don't know secret (Team Regular Win)
export const outcomeTeamRegularWin: GameOutcome = {
  playerResults: [
    {
      playerId: "inTheDark1",
      caughtByInTheLoop: false,
      knowsSecret: false,
      winningResult: { type: "regular", points: 1 },
    },
    {
      playerId: "inTheDark2",
      caughtByInTheLoop: false,
      knowsSecret: false,
      winningResult: { type: "regular", points: 1 },
    },
  ],
};

// TEAM MODE: one or both caught, both don't know secret (Team Loss)
export const outcomeTeamLoss: GameOutcome = {
  playerResults: [
    {
      playerId: "inTheDark1",
      caughtByInTheLoop: true,
      knowsSecret: false,
      winningResult: { type: "loss", points: 0 },
    },
    {
      playerId: "inTheDark2",
      caughtByInTheLoop: true,
      knowsSecret: false,
      winningResult: { type: "loss", points: 0 },
    },
  ],
};

// TEAM MODE: both not caught, both know secret (Team Double Win)
export const outcomeTeamDoubleWin: GameOutcome = {
  playerResults: [
    {
      playerId: "inTheDark1",
      caughtByInTheLoop: false,
      knowsSecret: true,
      winningResult: { type: "double", points: 2 },
    },
    {
      playerId: "inTheDark2",
      caughtByInTheLoop: false,
      knowsSecret: true,
      winningResult: { type: "double", points: 2 },
    },
  ],
};

// TEAM MODE: all caught, all know secret (Team Tie)
export const outcomeTeamTie: GameOutcome = {
  playerResults: [
    {
      playerId: "inTheDark1",
      caughtByInTheLoop: true,
      knowsSecret: true,
      winningResult: { type: "tie", points: 1 },
    },
    {
      playerId: "inTheDark2",
      caughtByInTheLoop: true,
      knowsSecret: true,
      winningResult: { type: "tie", points: 1 },
    },
  ],
};

// INDIVIDUAL MODE: one caught, one not caught, both don't know secret (Half Win)
export const outcomeIndividualHalfWin: GameOutcome = {
  playerResults: [
    {
      playerId: "inTheDark1",
      caughtByInTheLoop: true,
      knowsSecret: false,
      winningResult: { type: "loss", points: 0 },
    },
    {
      playerId: "inTheDark2",
      caughtByInTheLoop: false,
      knowsSecret: false,
      winningResult: { type: "half", points: 0.5 },
    },
  ],
};

// INDIVIDUAL MODE: not caught, one knows secret, one doesn't (Double Win + Regular Win)
export const outcomeIndividualDoubleAndRegularWin: GameOutcome = {
  playerResults: [
    {
      playerId: "inTheDark1",
      caughtByInTheLoop: false,
      knowsSecret: true,
      winningResult: { type: "double", points: 2 },
    },
    {
      playerId: "inTheDark2",
      caughtByInTheLoop: false,
      knowsSecret: false,
      winningResult: { type: "regular", points: 1 },
    },
  ],
};

// INDIVIDUAL MODE: one caught (loss), one not caught knows secret (one and a half win), one not caught doesn't know secret (half win)
export const outcomeIndividualWinAndHalf: GameOutcome = {
  playerResults: [
    {
      playerId: "inTheDark1",
      caughtByInTheLoop: true,
      knowsSecret: false,
      winningResult: { type: "loss", points: 0 },
    },
    {
      playerId: "inTheDark2",
      caughtByInTheLoop: false,
      knowsSecret: true,
      winningResult: { type: "oneAndHalf", points: 1.5 },
    },
    {
      playerId: "inTheDark3",
      caughtByInTheLoop: false,
      knowsSecret: false,
      winningResult: { type: "half", points: 0.5 },
    },
  ],
};

// INDIVIDUAL MODE: one not caught, knows secret, gets one and a half win
export const outcomeIndividualOneAndHalfWin: GameOutcome = {
  playerResults: [
    {
      playerId: "inTheDark1",
      caughtByInTheLoop: false,
      knowsSecret: true,
      winningResult: { type: "oneAndHalf", points: 1.5 },
    },
    {
      playerId: "inTheDark2",
      caughtByInTheLoop: true,
      knowsSecret: false,
      winningResult: { type: "loss", points: 0 },
    },
  ],
};

/**
 * Incorrectly Formatted GameOutcome Data (for negative/failure tests)
 *
 * Add any GameOutcome objects here that intentionally violate the game rules.
 * These are useful for testing error handling and validation logic.
 */
// Example:
// export const outcomeInvalidNegativePoints: GameOutcome = {
//   playerResults: [
//     {
//       playerId: "inTheDark1",
//       caughtByInTheLoop: false,
//       knowsSecret: false,
//       pointResults: { inTheLoopPoints: 0, inTheDarkPoints: { inTheDark1: -1 } }, // Invalid: negative points
//     },
//   ],
// };
