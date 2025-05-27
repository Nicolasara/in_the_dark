# Screens Directory

This directory contains all the main screens of the In The Dark game application. Each screen represents a full page in the app's navigation flow.

## Main Screens

- `TitleScreen.tsx`: The initial screen users see when opening the app
- `PlayerSelectionScreen.tsx`: Screen for adding and managing players before starting a game
- `CategorySelectionScreen.tsx`: Screen for selecting game categories
- `GameScreen.tsx`: The main game screen that manages the game flow

## Game Screens

The `game/` subdirectory contains all the phase-specific screens that make up the game flow. See the [game directory README](./game/README.md) for details.

## Screen Structure

Each screen is a React component that:

1. Handles its own state management
2. Manages user interactions
3. Navigates to other screens as needed
4. Maintains a consistent UI/UX with the rest of the application

## Development Guidelines

1. Keep screens focused on a single responsibility
2. Use TypeScript for type safety
3. Follow the naming convention of `[Name]Screen.tsx`
4. Place game-specific screens in the `game/` subdirectory
5. Maintain consistent styling with the app's theme
