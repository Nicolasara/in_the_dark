import { GameModeConfig } from "./gameModes";

export type RootStackParamList = {
  Title: undefined;
  PlayerSelection: undefined;
  CategorySelection: {
    gameModeConfig: GameModeConfig;
    playerNames: string[];
  };
  Game: {
    gameModeConfig: GameModeConfig;
    category: string;
    playerNames: string[];
  };
};
