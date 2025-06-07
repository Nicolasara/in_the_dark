import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigation";
import { GameModeType } from "../types/gameModes";
import {
  createGameMode,
  calculateMaxInTheDarkPlayers,
} from "../utils/gameModes";

type GameModeSelectionScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "GameModeSelection"
>;
type GameModeSelectionScreenRouteProp = RouteProp<
  RootStackParamList,
  "GameModeSelection"
>;

interface GameModeSelectionScreenProps {
  navigation: GameModeSelectionScreenNavigationProp;
  route: GameModeSelectionScreenRouteProp;
}

interface GameModeOption {
  type: GameModeType;
  title: string;
  description: string;
  minPlayers: number;
}

const GAME_MODE_OPTIONS: GameModeOption[] = [
  {
    type: "single",
    title: "Single Player Mode",
    description: "One player is in the dark, everyone else is in the loop",
    minPlayers: 3,
  },
  {
    type: "teamKnown",
    title: "Team Mode (Known)",
    description: "Multiple players in the dark know who their teammates are",
    minPlayers: 4,
  },
  {
    type: "teamUnknown",
    title: "Team Mode (Unknown)",
    description:
      "Multiple players in the dark don't know who their teammates are",
    minPlayers: 4,
  },
  {
    type: "individual",
    title: "Individual Mode",
    description: "Multiple players in the dark compete independently",
    minPlayers: 4,
  },
];

export const GameModeSelectionScreen: React.FC<
  GameModeSelectionScreenProps
> = ({ navigation, route }) => {
  const { playerNames } = route.params;
  const totalPlayers = playerNames.length;

  const [selectedGameMode, setSelectedGameMode] =
    useState<GameModeType>("single");
  const [inTheDarkPlayers, setInTheDarkPlayers] = useState<number>(1);

  // Get available game modes based on player count
  const availableGameModes = GAME_MODE_OPTIONS.filter(
    (mode) => totalPlayers >= mode.minPlayers
  );

  // Calculate max players in the dark for selected mode
  const maxInTheDarkForMode = calculateMaxInTheDarkPlayers(
    totalPlayers,
    selectedGameMode
  );

  // Update inTheDarkPlayers when game mode changes
  React.useEffect(() => {
    if (selectedGameMode === "single") {
      setInTheDarkPlayers(1);
    } else {
      // For multi-player modes, default to 2 or max if less
      setInTheDarkPlayers(Math.min(2, maxInTheDarkForMode));
    }
  }, [selectedGameMode, maxInTheDarkForMode]);

  const handleGameModeSelect = (gameMode: GameModeType) => {
    setSelectedGameMode(gameMode);
  };

  const handleInTheDarkPlayersChange = (count: number) => {
    setInTheDarkPlayers(count);
  };

  const proceedToCategories = () => {
    if (inTheDarkPlayers > maxInTheDarkForMode) {
      Alert.alert(
        "Invalid Configuration",
        `Maximum ${maxInTheDarkForMode} players can be in the dark for this mode with ${totalPlayers} total players.`
      );
      return;
    }

    const gameModeConfig = {
      type: selectedGameMode,
      totalPlayers,
      inTheDarkPlayers,
    };

    navigation.navigate("CategorySelection", {
      gameModeConfig,
      playerNames,
    });
  };

  const renderPlayerCountSelector = () => {
    if (selectedGameMode === "single") {
      return null; // Single mode always has 1 player in the dark
    }

    const minPlayers = 2;
    const maxPlayers = maxInTheDarkForMode;
    const playerOptions = [];

    for (let i = minPlayers; i <= maxPlayers; i++) {
      playerOptions.push(i);
    }

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Players In The Dark</Text>
        <Text style={styles.sectionSubtitle}>
          Choose how many players will be in the dark (max {maxPlayers})
        </Text>
        <View style={styles.playerCountContainer}>
          {playerOptions.map((count) => (
            <TouchableOpacity
              key={count}
              style={[
                styles.playerCountButton,
                inTheDarkPlayers === count && styles.playerCountButtonSelected,
              ]}
              onPress={() => handleInTheDarkPlayersChange(count)}
            >
              <Text
                style={[
                  styles.playerCountButtonText,
                  inTheDarkPlayers === count &&
                    styles.playerCountButtonTextSelected,
                ]}
              >
                {count}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Game Mode</Text>
      <Text style={styles.subtitle}>
        {totalPlayers} players: {playerNames.join(", ")}
      </Text>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Game Mode</Text>
          {availableGameModes.map((mode) => (
            <TouchableOpacity
              key={mode.type}
              style={[
                styles.gameModeOption,
                selectedGameMode === mode.type && styles.gameModeOptionSelected,
              ]}
              onPress={() => handleGameModeSelect(mode.type)}
            >
              <Text
                style={[
                  styles.gameModeTitle,
                  selectedGameMode === mode.type && styles.gameModeTextSelected,
                ]}
              >
                {mode.title}
              </Text>
              <Text
                style={[
                  styles.gameModeDescription,
                  selectedGameMode === mode.type && styles.gameModeTextSelected,
                ]}
              >
                {mode.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {renderPlayerCountSelector()}

        <View style={styles.section}>
          <Text style={styles.summaryTitle}>Configuration Summary</Text>
          <Text style={styles.summaryText}>
            Mode:{" "}
            {GAME_MODE_OPTIONS.find((m) => m.type === selectedGameMode)?.title}
          </Text>
          <Text style={styles.summaryText}>
            Players in the dark: {inTheDarkPlayers}
          </Text>
          <Text style={styles.summaryText}>
            Players in the loop: {totalPlayers - inTheDarkPlayers}
          </Text>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.continueButton}
        onPress={proceedToCategories}
      >
        <Text style={styles.continueButtonText}>Continue to Categories</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginTop: 15,
  },
  subtitle: {
    fontSize: 16,
    color: "#cccccc",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 20,
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: "#cccccc",
    marginBottom: 15,
  },
  gameModeOption: {
    backgroundColor: "#2a2a2a",
    padding: 15,
    borderRadius: 6,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: "transparent",
  },
  gameModeOptionSelected: {
    borderColor: "#4CAF50",
    backgroundColor: "#2a4a2a",
  },
  gameModeTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 4,
  },
  gameModeDescription: {
    fontSize: 15,
    color: "#cccccc",
  },
  gameModeTextSelected: {
    color: "#4CAF50",
  },
  playerCountContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  playerCountButton: {
    backgroundColor: "#2a2a2a",
    padding: 12,
    borderRadius: 6,
    minWidth: 45,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },
  playerCountButtonSelected: {
    borderColor: "#4CAF50",
    backgroundColor: "#2a4a2a",
  },
  playerCountButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
  },
  playerCountButtonTextSelected: {
    color: "#4CAF50",
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 15,
    color: "#cccccc",
    marginBottom: 4,
  },
  continueButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  continueButtonText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
