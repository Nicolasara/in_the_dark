# Multiple "In The Dark" Players Game Rules

This directory contains the implementation and documentation for handling multiple "in the dark" players in the game. The game can be configured to support different team dynamics and winning conditions.

## Fundamental Winning Conditions

The game has four possible outcomes based on two key factors:

1. Whether the "in the dark" players are caught by those "in the loop"
2. Whether the "in the dark" players know the secret

### Outcome Hierarchy

1. **Double Win** (Highest)

   - Players are NOT caught by those in the loop
   - Players know the secret
   - This is considered a "perfect win" with double points
   - Note: Points system is planned for future implementation

2. **Regular Win**

   - Players are NOT caught by those in the loop
   - Players do NOT know the secret
   - The "in the dark" players win

3. **Regular Loss**

   - Players ARE caught by those in the loop
   - Players do NOT know the secret
   - The "in the loop" players win

4. **Tie** (Lowest)
   - Players ARE caught by those in the loop
   - Players know the secret
   - This results in a tie between both groups

### Winning Conditions Flow Diagram

```mermaid
flowchart TD
    Start[Game Start] --> Caught{Caught by In The Loop?}

    Caught -->|Yes| KnowSecret1{Know the Secret?}
    Caught -->|No| KnowSecret2{Know the Secret?}

    KnowSecret1 -->|Yes| Tie[Tie]
    KnowSecret1 -->|No| RegularLoss[Regular Loss In The Loop Wins]

    KnowSecret2 -->|Yes| DoubleWin[Double Win Perfect Victory]
    KnowSecret2 -->|No| RegularWin[Regular Win In The Dark Wins]

    style DoubleWin fill:#90EE90,stroke:#006400,color:#333333
    style RegularWin fill:#98FB98,stroke:#006400,color:#333333
    style RegularLoss fill:#FFB6C1,stroke:#8B0000,color:#333333
    style Tie fill:#D3D3D3,stroke:#696969,color:#333333

    classDef default fill:#f9f9f9,stroke:#333,stroke-width:2px,color:#333333;
```

## Game Modes

### 1. Single Player Mode (Default)

- Only one player is "in the dark"
- No special team rules or coordination needed
- Standard winning conditions apply:
  - Double Win: Not caught and knows the secret
  - Regular Win: Not caught and doesn't know the secret
  - Regular Loss: Caught and doesn't know the secret
  - Tie: Caught but knows the secret

### 2. Team Mode

In this mode, all "in the dark" players work together as a single team.

#### 2.1 Known Team Members

- Players who are "in the dark" know who their teammates are
- The team is considered "caught" if ANY player in the dark is voted out
- Maximum number of "in the dark" players = ⌊(total players - 1) / 2⌋
  - Example: In a 7-player game, maximum 3 players can be in the dark
  - This ensures there are always more players "in the loop" than "in the dark"
- Team Dynamics:
  - Players always work together as a single unit
  - During the guessing phase, they collaborate to make a single team guess
  - They can discuss and share information to help each other figure out the secret but this must be done in a way that does not reveal the secret to the "in the loop" players
  - The team wins or loses together based on their collective performance
- Same winning conditions as single player mode:
  - Double Win: If "in the dark" team is caught and at least one player knows the secret
  - Regular Win: If "in the dark" team is caught and no one knows the secret
  - Regular Loss: If someone is caught and no one knows the secret
  - Tie: If someone is caught but at least one player knows the secret

#### 2.2 Unknown Team Members

- Players who are "in the dark" know they are part of a team but don't know who their teammates are
- The team is considered "caught" if ANY player in the dark is voted out
- Maximum number of "in the dark" players = ⌊total players / 2⌋
  - Example: In a 6-player game, maximum 3 players can be in the dark
  - This allows there to be the same number of players "in the dark" as "in the loop". But it will be harder for those in the dark to work together and communicate who they are voting for.
  - If each team has the same number of players then a tie goes to the people in the loop.
- Team Dynamics:
  - Players must work together but will not know who their teammates are
  - During the guessing phase, they collaborate to make a single team guess. This is possible since the guessing phase is after the revealing of who is in the dark
  - Players cannot openly collaborate as they don't know who their teammates are.
  - The team wins or loses together based on their collective performance.
- Same winning conditions as single player mode:
  - Double Win: If "in the dark" team is caught and at least one player knows the secret
  - Regular Win: If "in the dark" team is caught and no one knows the secret
  - Regular Loss: If someone is caught and no one knows the secret
  - Tie: If someone is caught but at least one player knows the secret

### 3. Individual Mode

In this mode, each "in the dark" player plays independently, with winning conditions based on who gets caught.

#### 3.1 Competitive Individual

- Players who are "in the dark" don't know who else is in the dark
- Each player competes against all other players
- Winning Conditions based on who gets caught:

```mermaid
flowchart TD
    Start[Game Start] --> WhoCaught{Who was Caught?}

    WhoCaught -->|In The Loop| KnowSecret1{Know the Secret?}
    WhoCaught -->|In The Dark Other Player| KnowSecret2{Know the Secret?}
    WhoCaught -->|In The Dark Self| KnowSecret3{Know the Secret?}

    KnowSecret1 -->|Yes| DoubleWin[Double Win Perfect Victory]
    KnowSecret1 -->|No| RegularWin[Regular Win In The Dark Wins]

    KnowSecret2 -->|Yes| Tie[Tie]
    KnowSecret2 -->|No| HalfWin[Half Win for unchosen player In The Dark and In The Loop Wins]

    KnowSecret3 -->|Yes| Tie[Tie]
    KnowSecret3 -->|No| RegularLoss[Regular Loss In The Loop Wins]

    style DoubleWin fill:#90EE90,stroke:#006400,color:#333333
    style RegularWin fill:#98FB98,stroke:#006400,color:#333333
    style HalfWin fill:#FFD700,stroke:#B8860B,color:#333333
    style RegularLoss fill:#FFB6C1,stroke:#8B0000,color:#333333
    style Tie fill:#D3D3D3,stroke:#696969,color:#333333

    classDef default fill:#f9f9f9,stroke:#333,stroke-width:2px,color:#333333;
```

1. If someone "in the loop" is caught:
   - Double Win: If player knows the secret
   - Regular Win: If player doesn't know the secret
2. If another player "in the dark" is caught:
   - Tie: If player knows the secret
   - Half Win: If player doesn't know the secret (In The Loop wins, but player gets partial credit)
3. If the player themselves is caught:
   - Tie: If they know the secret
   - Regular Loss: If they don't know the secret

- Multiple winners possible if multiple players achieve the same outcome
- Note: Half Win is tracked for future points system implementation

## Implementation Considerations

### Game Flow Modifications

1. Setup Phase

   - Need to support selecting multiple "in the dark" players
   - Configuration of game mode (Single Player, Team, or Individual)
     - For Single Player mode: No special setup needed
     - For Team mode: Configuration of team knowledge (Known vs Unknown teammates)
     - For Individual mode: No special setup needed

2. Reveal Phase

   - Modified to handle multiple "in the dark" players
   - Different reveal mechanics based on game mode:
     - Single Player: Standard reveal
     - Team Mode: May reveal team membership based on configuration
     - Individual Mode: Standard reveal (players don't know who else is in the dark)

3. Questions Phase

   - No significant changes needed
   - Questions can be asked to any player regardless of their status

4. Voting Phase

   - Modified to handle multiple potential "in the dark" players
   - Need to track who gets caught and their role (in the loop or in the dark)
   - For Individual mode: Track which "in the dark" player was caught (self or other)
   - For Team mode: Any caught player results in team being caught

5. Guessing Phase

   - Modified to handle multiple guesses
     - Team mode: Single team guess with collaboration, change dialogue telling the team to make a guess together
     - Individual mode: Each player makes their own guess
     - Need to track who knows the secret for winning condition determination.

6. Results Phase
   - Modified to show results for multiple players
   - Different result displays based on game mode
   - Need to show:
     - Who was caught and their role
     - Who knew the secret
     - Final outcome (Double Win, Regular Win, Half Win, Regular Loss, or Tie)
   - For Individual mode: Show individual results and any Half Wins
   - For Team mode: Show team results

### Technical Requirements

1. New game configuration options

   - Game mode selection
   - Team mode settings
   - Player count limits based on mode

2. Modified game state management

   - Track player roles (in the dark, in the loop)
   - Track team membership (if applicable)
   - Track who was caught and their role
   - Track who knows the secret

3. Updated UI components

   - Support for multiple player displays
   - Team collaboration interface
   - Results display for different outcomes
   - Half Win tracking and display

4. New winning condition logic

   - Mode-specific condition checking
   - Half Win implementation
   - Team vs Individual outcome determination

5. Modified scoring system (for future implementation)

   - Double Win points
   - Regular Win points
   - Half Win points
   - Tie handling

6. Updated game summary display
   - Show all relevant outcomes
   - Display team results
   - Show individual achievements
   - Track and display Half Wins

## Future Considerations

1. Points System Implementation

   - Double Win: 2x points
   - Regular Win: 1x points
   - Half Win: 0.5x points
   - Tie: 1x points for everyone
   - Team mode point distribution
