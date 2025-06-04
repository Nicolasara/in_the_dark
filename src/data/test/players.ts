import { Player } from "../../types/gameTypes";

/**
 * All player test data below is correctly formatted and represents valid game states
 * according to the phase order and rules described in the game README.
 *
 * If you need to test invalid or impossible states (for negative/failure tests),
 * add them in the "Incorrectly Formatted Player Data" section at the bottom of this file.
 */

// --- In The Dark Players ---

// Not answered, not caught, has NOT gone through reveal (pre-reveal phase)
export const playerInTheDarkPreReveal: Player = {
  id: "inTheDarkPreReveal",
  name: "In The Dark - Pre Reveal",
  isInTheDark: true,
  goneThroughReveal: false,
  votes: 0,
  hasVoted: false,
  answer: undefined,
  question: undefined,
  knowsSecret: false,
};

// Not answered, not caught, has gone through reveal (post-reveal, pre-questions)
export const playerInTheDarkPostReveal: Player = {
  id: "inTheDarkPostReveal",
  name: "In The Dark - Post Reveal",
  isInTheDark: true,
  goneThroughReveal: true,
  votes: 0,
  hasVoted: false,
  answer: undefined,
  question: undefined,
  knowsSecret: false,
};

// Answered incorrectly, not caught (post-reveal, post-questions)
export const playerInTheDarkAnsweredIncorrectly: Player = {
  id: "inTheDarkAnsweredIncorrectly",
  name: "In The Dark - Answered Incorrectly",
  isInTheDark: true,
  goneThroughReveal: true,
  votes: 0,
  hasVoted: true,
  answer: "wrong answer",
  question: "What is it?",
  knowsSecret: false,
};

// Answered correctly, not caught (post-reveal, post-questions)
export const playerInTheDarkAnsweredCorrectly: Player = {
  id: "inTheDarkAnsweredCorrectly",
  name: "In The Dark - Answered Correctly",
  isInTheDark: true,
  goneThroughReveal: true,
  votes: 0,
  hasVoted: true,
  answer: "ice cream",
  question: "Is it food?",
  knowsSecret: true,
};

// Caught, knows secret (post-reveal, post-voting)
export const playerInTheDarkCaughtKnowsSecret: Player = {
  id: "inTheDarkCaughtKnowsSecret",
  name: "In The Dark - Caught Knows Secret",
  isInTheDark: true,
  goneThroughReveal: true,
  votes: 2,
  hasVoted: true,
  answer: "ice cream",
  question: "Is it cold?",
  knowsSecret: true,
};

// Caught, doesn't know secret (post-reveal, post-voting)
export const playerInTheDarkCaughtNoSecret: Player = {
  id: "inTheDarkCaughtNoSecret",
  name: "In The Dark - Caught No Secret",
  isInTheDark: true,
  goneThroughReveal: true,
  votes: 2,
  hasVoted: true,
  answer: "pizza",
  question: "Is it hot?",
  knowsSecret: false,
};

// --- In The Loop Players ---

// Pre-reveal (should not have any game progress fields set)
export const playerInTheLoopPreReveal: Player = {
  id: "inTheLoopPreReveal",
  name: "In The Loop - Pre Reveal",
  isInTheDark: false,
  goneThroughReveal: false,
  votes: 0,
  hasVoted: false,
  answer: undefined,
  question: undefined,
  knowsSecret: false,
};

// Post-reveal, not voted
export const playerInTheLoopPostReveal: Player = {
  id: "inTheLoopPostReveal",
  name: "In The Loop - Post Reveal",
  isInTheDark: false,
  goneThroughReveal: true,
  votes: 0,
  hasVoted: false,
  answer: undefined,
  question: undefined,
  knowsSecret: true,
};

// Has voted, knows secret (post-reveal, post-voting)
export const playerInTheLoopHasVotedKnowsSecret: Player = {
  id: "inTheLoopHasVotedKnowsSecret",
  name: "In The Loop - Has Voted Knows Secret",
  isInTheDark: false,
  goneThroughReveal: true,
  votes: 1,
  hasVoted: true,
  answer: "ice cream",
  question: undefined,
  knowsSecret: true,
};

// Has not voted, does not know secret (post-reveal, pre-voting)
export const playerInTheLoopNotVotedNoSecret: Player = {
  id: "inTheLoopNotVotedNoSecret",
  name: "In The Loop - Not Voted No Secret",
  isInTheDark: false,
  goneThroughReveal: true,
  votes: 0,
  hasVoted: false,
  answer: undefined,
  question: undefined,
  knowsSecret: false,
};

// Has gone through reveal, has voted (post-reveal, post-voting)
export const playerInTheLoopSeenItemVoted: Player = {
  id: "inTheLoopSeenItemVoted",
  name: "In The Loop - Seen Item Voted",
  isInTheDark: false,
  goneThroughReveal: true,
  votes: 1,
  hasVoted: true,
  answer: undefined,
  question: undefined,
  knowsSecret: true,
};

// --- Edge/Utility Players ---

// Generic player for custom scenarios
export const playerCustom: Player = {
  id: "custom",
  name: "Custom Player",
  isInTheDark: false,
  goneThroughReveal: false,
  votes: 0,
  hasVoted: false,
  answer: undefined,
  question: undefined,
  knowsSecret: false,
};

/**
 * Incorrectly Formatted Player Data (for negative/failure tests)
 *
 * Add any player objects here that intentionally violate the game phase rules.
 * These are useful for testing error handling and validation logic.
 */
// Example:
// export const playerInvalidVotesPreReveal: Player = {
//   id: "invalidVotesPreReveal",
//   name: "Invalid - Votes Pre Reveal",
//   isInTheDark: true,
//   goneThroughReveal: false,
//   votes: 2, // Invalid: can't have votes before reveal
//   hasVoted: false,
//   answer: undefined,
//   question: undefined,
//   knowsSecret: false,
// };
