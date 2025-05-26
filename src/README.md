# Source Code Directory

This directory contains the main source code for the In The Dark game application. The codebase is organized into several subdirectories:

## Directory Structure

- `screens/`: Contains all the main screens of the application. Each screen is a React component that represents a full page in the app.
- `components/`: Reusable React components used across different screens.
- `types/`: TypeScript type definitions and interfaces used throughout the application.
- `data/`: Data files, constants, and other static content used by the application.

## Development Guidelines

1. All new screens should be added to the `screens/` directory
2. Reusable components should be placed in the `components/` directory
3. Type definitions should be centralized in the `types/` directory
4. Static data and constants should be stored in the `data/` directory

## File Naming Conventions

- Screen files should be named with the suffix `Screen.tsx` (e.g., `PlayerSelectionScreen.tsx`)
- Component files should be named with the suffix `.tsx` (e.g., `Button.tsx`)
- Data files should be named with the suffix `.ts`
