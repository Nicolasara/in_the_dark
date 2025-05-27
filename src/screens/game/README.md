# Game Screens Directory

This directory contains all the phase-specific screens that make up the game flow in In The Dark. Each file represents a different phase of the game.

## Game Flow

The game follows this sequence of phases:

1. `SetupPhase.tsx`: Initial game setup and rules explanation
2. `RevealPhase.tsx`: Reveals which players are "in the dark" (don't know the secret) and which are "in the loop" (know the secret)
3. `QuestionsPhase.tsx`: Each player gets asked at least one question from another player to gather information on who is possibly in the dark
4. `ReviewPhase.tsx`: Players see a summary of questions asked to each player and can ask for further details before voting
5. `VotingPhase.tsx`: Players take turns voting for which player they think is in the dark
6. `VoteResultsPhase.tsx`: Shows voting results, including who the majority voted for, who was actually in the dark, and whether votes were correct
7. `GuessingPhase.tsx`: Players who are in the dark make their final guesses about the secret item they didn't know about
8. `GuessingResultsPhase.tsx`: Reveals what the players in the dark guessed and whether their guesses were correct
9. `GameSummary.tsx`: Provides a comprehensive summary of the game, including information from all previous phases

## Phase Structure

Each phase component:

- Manages its own state and UI
- Handles phase-specific user interactions
- Transitions to the next phase when complete
- Maintains game state through the game context

## Development Guidelines

1. Keep phase transitions smooth and intuitive
2. Maintain consistent UI/UX across all phases
3. Handle edge cases and error states gracefully
4. Use TypeScript for type safety
5. Follow the naming convention of `[PhaseName]Phase.tsx` or `[PhaseName].tsx`
6. Ensure proper cleanup when unmounting phases
