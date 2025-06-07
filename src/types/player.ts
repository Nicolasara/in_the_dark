export interface Player {
  id: string;
  name: string;
  isInTheDark: boolean;
  goneThroughReveal: boolean;
  question?: string;
  answer?: string;
  votes: number;
  hasVoted: boolean;
  knowsSecret?: boolean;
  hasSeenItem?: boolean;
}
