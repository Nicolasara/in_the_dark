# In The Dark - Project Terminology

This document defines key terms and concepts specific to the "In The Dark" game project.

## Core Game Terms

### Player Roles

- **In The Dark**: Players who don't know the secret item and must try to figure it out
- **In The Loop**: Players who know the secret item and try to identify who is "in the dark"

### Game Modes

- **Single Player Mode**: Only one player is "in the dark" (Note: This does not mean the game is played with only one person. The minimum number of players for single in the dark mode is three. "Single player" refers to the number of players in the dark, not the total number of players.)
- **Team Mode**: Multiple players are "in the dark" and work together (Minimum total players: four)
  - **Known Teammates**: Players know who their teammates are
  - **Unknown Teammates**: Players don't know who their teammates are
- **Individual Mode**: Multiple players are "in the dark" but play independently (Minimum total players: four)

### Game Phases

- **Setup**: Initial game configuration
- **Reveal**: Shows which players are "in the dark" vs "in the loop"
- **Questions**: Players ask questions to gather information
- **Review**: Summary of questions and answers
- **Voting**: Players vote for who they think is "in the dark"
- **Vote Results**: Shows voting outcomes
- **Guessing**: Players "in the dark" make their final guesses about what the secret was
- **Guessing Results**: Reveals the guesses and correct answers
- **Ended**: Game summary phase showing final results and outcomes

### Winning Conditions

- **In The Dark Double Win**: Players "in the dark" are not caught AND know the secret (highest achievement)
- **In The Dark Win**: Players "in the dark" are not caught but don't know the secret
- **In The Dark Half Win**: In Individual Mode, when some players "in the dark" are caught but others aren't
- **Tie**: Players "in the dark" are caught but know the secret
- **In The Loop Win**: Players "in the dark" are caught and don't know the secret

### Game Mechanics

- **Secret**: A string (word or phrase) that players "in the dark" must guess. The secret is always from a specific category (e.g., if the category is "Food", the secret could be "ice cream" or "pizza")
- **Votes**: The number of votes a player receives during the voting phase
- **Answer**: A player's guess for the secret item
- **Team ID**: Identifier for players in team mode
- **Max In The Dark Players**: Maximum number of players allowed to be "in the dark" based on game mode and total players

## Technical Terms

- **Game State**: The current state of the game including players, phase, and outcomes
- **Game Mode**: Configuration determining how the game is played (Single, Team, or Individual)
- **Game Outcome**: The final results for each player including their win type and points
- **Player Result**: Individual outcome for a player including whether they were caught and knew the secret

## Notes

- The minimum number of players for single in the dark mode is three.
- The minimum number of players for team or individual mode (multiple in the dark) is four.
