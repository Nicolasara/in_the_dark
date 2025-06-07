import { GameModeConfig } from "./gameModes";

export type RootStackParamList = {
  Title: undefined;
  PlayerSelection: undefined;
  GameModeSelection: {
    playerNames: string[];
  };
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
