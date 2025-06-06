import { GameState } from "../../types/gameState";
import { createGameMode } from "../../utils/gameModes";
import {
  playerInTheDarkAnsweredCorrectly,
  playerInTheDarkAnsweredIncorrectly,
  playerInTheDarkCaughtKnowsSecret,
  playerInTheDarkCaughtNoSecret,
  playerInTheLoopHasVotedKnowsSecret,
  playerInTheLoopNotVotedNoSecret,
  playerInTheLoopSeenItemVoted,
  playerInTheLoopPostReveal,
} from "./players";
import {
  outcomeSingleInTheDarkDoubleWin,
  outcomeSingleInTheDarkWin,
  outcomeSingleInTheDarkTie,
  outcomeSingleInTheLoopWin,
  outcomeTeamWin,
  outcomeTeamLoss,
  outcomeTeamDoubleWin,
  outcomeTeamTie,
  outcomeIndividualHalfWin,
  outcomeIndividualDoubleAndWin,
  outcomeIndividualWinAndHalf,
  outcomeIndividualOneAndHalfWin,
} from "./gameOutcomes";

/**
 * All game state test data below is correctly formatted and represents valid scenarios
 * according to the rules described in the project documentation.
 *
 * If you need to test invalid or impossible game states (for negative/failure tests),
 * add them in the "Incorrectly Formatted GameState Data" section at the bottom of this file.
 */

// --- Correctly Formatted GameState Data ---

// Single in the dark, not caught, knows secret (In The Dark Double Win)
export const gameStateSingleInTheDarkDoubleWin: GameState = {
  players: [
    { ...playerInTheDarkAnsweredCorrectly, id: "inTheDark1", answer: "secret" },
    { ...playerInTheLoopPostReveal, id: "inTheLoop1" },
    { ...playerInTheLoopPostReveal, id: "inTheLoop2" },
  ],
  currentPhase: "ended",
  gameMode: createGameMode({ type: "single", totalPlayers: 3 }),
  outcomes: [outcomeSingleInTheDarkDoubleWin],
  secret: "secret",
  round: 1,
};

// Single in the dark, not caught, doesn't know secret (In The Dark Win)
export const gameStateSingleInTheDarkWin: GameState = {
  players: [
    {
      ...playerInTheDarkAnsweredIncorrectly,
      id: "inTheDark1",
      answer: "wrong",
    },
    { ...playerInTheLoopPostReveal, id: "inTheLoop1" },
    { ...playerInTheLoopPostReveal, id: "inTheLoop2" },
  ],
  currentPhase: "ended",
  gameMode: createGameMode({ type: "single", totalPlayers: 3 }),
  outcomes: [outcomeSingleInTheDarkWin],
  secret: "secret",
  round: 1,
};

// Single in the dark, caught, knows secret (Tie)
export const gameStateSingleInTheDarkTie: GameState = {
  players: [
    {
      ...playerInTheDarkCaughtKnowsSecret,
      id: "inTheDark1",
      answer: "secret",
      votes: 2,
    },
    { ...playerInTheLoopHasVotedKnowsSecret, id: "inTheLoop1", votes: 1 },
    { ...playerInTheLoopHasVotedKnowsSecret, id: "inTheLoop2", votes: 1 },
  ],
  currentPhase: "ended",
  gameMode: createGameMode({ type: "single", totalPlayers: 3 }),
  outcomes: [outcomeSingleInTheDarkTie],
  secret: "secret",
  round: 1,
};

// Single in the dark, caught, doesn't know secret (In The Loop Win)
export const gameStateSingleInTheLoopWin: GameState = {
  players: [
    {
      ...playerInTheDarkCaughtNoSecret,
      id: "inTheDark1",
      answer: "wrong",
      votes: 2,
    },
    { ...playerInTheLoopHasVotedKnowsSecret, id: "inTheLoop1", votes: 1 },
    { ...playerInTheLoopHasVotedKnowsSecret, id: "inTheLoop2", votes: 1 },
  ],
  currentPhase: "ended",
  gameMode: createGameMode({ type: "single", totalPlayers: 3 }),
  outcomes: [outcomeSingleInTheLoopWin],
  secret: "secret",
  round: 1,
};

// TEAM MODE: both not caught, both don't know secret (Team Win)
export const gameStateTeamWin: GameState = {
  players: [
    {
      ...playerInTheDarkAnsweredIncorrectly,
      id: "inTheDark1",
      answer: "wrong",
    },
    {
      ...playerInTheDarkAnsweredIncorrectly,
      id: "inTheDark2",
      answer: "wrong",
    },
    { ...playerInTheLoopPostReveal, id: "inTheLoop1" },
    { ...playerInTheLoopPostReveal, id: "inTheLoop2" },
  ],
  currentPhase: "ended",
  gameMode: createGameMode({
    type: "teamKnown",
    totalPlayers: 4,
  }),
  outcomes: [outcomeTeamWin],
  secret: "secret",
  round: 1,
};

// TEAM MODE: one or both caught, both don't know secret (Team Loss)
export const gameStateTeamLoss: GameState = {
  players: [
    {
      ...playerInTheDarkCaughtNoSecret,
      id: "inTheDark1",
      answer: "wrong",
      votes: 2,
    },
    {
      ...playerInTheDarkCaughtNoSecret,
      id: "inTheDark2",
      answer: "wrong",
      votes: 2,
    },
    { ...playerInTheLoopHasVotedKnowsSecret, id: "inTheLoop1", votes: 1 },
    { ...playerInTheLoopHasVotedKnowsSecret, id: "inTheLoop2", votes: 1 },
  ],
  currentPhase: "ended",
  gameMode: createGameMode({
    type: "teamKnown",
    totalPlayers: 4,
  }),
  outcomes: [outcomeTeamLoss],
  secret: "secret",
  round: 1,
};

// TEAM MODE: both not caught, both know secret (Team Double Win)
export const gameStateTeamDoubleWin: GameState = {
  players: [
    { ...playerInTheDarkAnsweredCorrectly, id: "inTheDark1", answer: "secret" },
    { ...playerInTheDarkAnsweredCorrectly, id: "inTheDark2", answer: "secret" },
    { ...playerInTheLoopPostReveal, id: "inTheLoop1" },
    { ...playerInTheLoopPostReveal, id: "inTheLoop2" },
  ],
  currentPhase: "ended",
  gameMode: createGameMode({
    type: "teamKnown",
    totalPlayers: 4,
  }),
  outcomes: [outcomeTeamDoubleWin],
  secret: "secret",
  round: 1,
};

// TEAM MODE: all caught, all know secret (Team Tie)
export const gameStateTeamTie: GameState = {
  players: [
    {
      ...playerInTheDarkCaughtKnowsSecret,
      id: "inTheDark1",
      answer: "secret",
      votes: 2,
    },
    {
      ...playerInTheDarkCaughtKnowsSecret,
      id: "inTheDark2",
      answer: "secret",
      votes: 2,
    },
    { ...playerInTheLoopHasVotedKnowsSecret, id: "inTheLoop1", votes: 1 },
    { ...playerInTheLoopHasVotedKnowsSecret, id: "inTheLoop2", votes: 1 },
  ],
  currentPhase: "ended",
  gameMode: createGameMode({
    type: "teamKnown",
    totalPlayers: 4,
  }),
  outcomes: [outcomeTeamTie],
  secret: "secret",
  round: 1,
};

// INDIVIDUAL MODE: one caught, one not caught, both don't know secret (Half Win)
export const gameStateIndividualHalfWin: GameState = {
  players: [
    {
      ...playerInTheDarkCaughtNoSecret,
      id: "inTheDark1",
      answer: "wrong",
      votes: 2,
    },
    {
      ...playerInTheDarkAnsweredIncorrectly,
      id: "inTheDark2",
      answer: "wrong",
      votes: 0,
    },
    { ...playerInTheLoopHasVotedKnowsSecret, id: "inTheLoop1", votes: 1 },
    { ...playerInTheLoopHasVotedKnowsSecret, id: "inTheLoop2", votes: 1 },
  ],
  currentPhase: "ended",
  gameMode: createGameMode({ type: "individual", totalPlayers: 4 }),
  outcomes: [outcomeIndividualHalfWin],
  secret: "secret",
  round: 1,
};

// INDIVIDUAL MODE: not caught, one knows secret, one doesn't (Double Win + Win)
export const gameStateIndividualDoubleAndWin: GameState = {
  players: [
    { ...playerInTheDarkAnsweredCorrectly, id: "inTheDark1", answer: "secret" },
    {
      ...playerInTheDarkAnsweredIncorrectly,
      id: "inTheDark2",
      answer: "wrong",
    },
    { ...playerInTheLoopPostReveal, id: "inTheLoop1" },
    { ...playerInTheLoopPostReveal, id: "inTheLoop2" },
  ],
  currentPhase: "ended",
  gameMode: createGameMode({ type: "individual", totalPlayers: 4 }),
  outcomes: [outcomeIndividualDoubleAndWin],
  secret: "secret",
  round: 1,
};

// INDIVIDUAL MODE: one caught (loss), one not caught knows secret (one and a half win), one not caught doesn't know secret (half win)
export const gameStateIndividualWinAndHalf: GameState = {
  players: [
    {
      ...playerInTheDarkCaughtNoSecret,
      id: "inTheDark1",
      answer: "wrong",
      votes: 2,
    },
    { ...playerInTheDarkAnsweredCorrectly, id: "inTheDark2", answer: "secret" },
    {
      ...playerInTheDarkAnsweredIncorrectly,
      id: "inTheDark3",
      answer: "wrong",
    },
    { ...playerInTheLoopPostReveal, id: "inTheLoop1" },
  ],
  currentPhase: "ended",
  gameMode: createGameMode({ type: "individual", totalPlayers: 4 }),
  outcomes: [outcomeIndividualWinAndHalf],
  secret: "secret",
  round: 1,
};

// INDIVIDUAL MODE: one not caught, knows secret, gets one and a half win
export const gameStateIndividualOneAndHalfWin: GameState = {
  players: [
    { ...playerInTheDarkAnsweredCorrectly, id: "inTheDark1", answer: "secret" },
    {
      ...playerInTheDarkCaughtNoSecret,
      id: "inTheDark2",
      answer: "wrong",
      votes: 2,
    },
    { ...playerInTheLoopPostReveal, id: "inTheLoop1" },
    { ...playerInTheLoopPostReveal, id: "inTheLoop2" },
  ],
  currentPhase: "ended",
  gameMode: createGameMode({ type: "individual", totalPlayers: 4 }),
  outcomes: [outcomeIndividualOneAndHalfWin],
  secret: "secret",
  round: 1,
};

/**
 * Incorrectly Formatted GameState Data (for negative/failure tests)
 *
 * Add any GameState objects here that intentionally violate the game rules.
 * These are useful for testing error handling and validation logic.
 */
// Example:
// export const gameStateInvalidNoInTheDark: GameState = {
//   players: [
//     { ...playerInTheLoopPostReveal, id: "inTheLoop1" },
//   ],
//   currentPhase: "ended",
//   gameMode: createGameMode({ type: "single", totalPlayers: 1 }),
//   outcomes: [],
//   secret: "secret",
//   round: 1,
// };
