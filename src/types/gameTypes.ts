export interface Player {
  name: string;
  isInTheDark: boolean;
  hasSeenItem: boolean;
  question?: string;
  answer?: string;
  votes: number;
  hasVoted: boolean;
}

export type GamePhase = 'setup' | 'reveal' | 'questions' | 'review' | 'voting' | 'voteResults' | 'guessing' | 'guessingResults' | 'ended'; 