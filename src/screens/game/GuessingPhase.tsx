import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Player } from "../../types/player";
import { GameMode } from "../../types/gameModes";
import { getPlayersInTheDark } from "../../utils/players";

interface GuessingPhaseProps {
  players: Player[];
  currentPlayerIndex: number;
  selectedItem: string;
  categoryItems: string[];
  gameMode: GameMode;
  onPhaseComplete: () => void;
  onPlayerComplete: () => void;
  updatePlayer: (playerIndex: number, updates: Partial<Player>) => void;
  updateMultiplePlayers?: (
    playerUpdates: { playerIndex: number; updates: Partial<Player> }[]
  ) => void;
}

export const GuessingPhase: React.FC<GuessingPhaseProps> = ({
  players,
  currentPlayerIndex,
  selectedItem,
  categoryItems,
  gameMode,
  onPhaseComplete,
  onPlayerComplete,
  updatePlayer,
  updateMultiplePlayers,
}) => {
  const [options, setOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const currentPlayer = players[currentPlayerIndex];
  const playersInTheDark = getPlayersInTheDark(players);
  const isTeamMode =
    gameMode.type === "teamKnown" || gameMode.type === "teamUnknown";

  useEffect(() => {
    // Generate 5 random items from the category (excluding the selected item)
    const otherItems = categoryItems
      .filter((item) => item !== selectedItem)
      .sort(() => Math.random() - 0.5)
      .slice(0, 5);

    // Add the selected item and shuffle
    const allOptions = [...otherItems, selectedItem].sort(
      () => Math.random() - 0.5
    );

    setOptions(allOptions);
  }, [selectedItem, categoryItems]);

  const handleGuess = (option: string) => {
    setSelectedOption(option);
  };

  const handleConfirm = () => {
    if (selectedOption) {
      if (isTeamMode) {
        // Team mode: Set the same answer for all players in the dark
        if (updateMultiplePlayers) {
          // Use bulk update if available
          const playerUpdates = playersInTheDark
            .map((player) => {
              const playerIndex = players.findIndex((p) => p.id === player.id);
              return { playerIndex, updates: { answer: selectedOption } };
            })
            .filter((update) => update.playerIndex >= 0);

          updateMultiplePlayers(playerUpdates);
        } else {
          // Fallback to individual updates
          playersInTheDark.forEach((player) => {
            const playerIndex = players.findIndex((p) => p.id === player.id);
            if (playerIndex >= 0) {
              updatePlayer(playerIndex, { answer: selectedOption });
            }
          });
        }
      } else {
        // Individual mode: Set answer only for current player
        updatePlayer(currentPlayerIndex, { answer: selectedOption });
      }
      onPlayerComplete();
      setSelectedOption(null);
    }
  };

  if (!currentPlayer.isInTheDark) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Waiting for Others</Text>
        <Text style={styles.subtitle}>
          Only players who are in the dark can guess the item.
        </Text>
      </View>
    );
  }

  if (currentPlayer.answer) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          {isTeamMode ? "Team Guess Complete" : "Guess Already Made"}
        </Text>
        <Text style={styles.subtitle}>
          {isTeamMode
            ? `Your team has already made a guess: "${currentPlayer.answer}"`
            : `${currentPlayer.name}, you have already made your guess: "${currentPlayer.answer}"`}
        </Text>
        <Text style={styles.subtitle}>
          {isTeamMode ? "Moving to results..." : "Waiting for other players..."}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isTeamMode ? "Team Guess" : "Make Your Guess"}
      </Text>
      <Text style={styles.subtitle}>
        {isTeamMode
          ? `Team in the dark (${playersInTheDark
              .map((p) => p.name)
              .join(", ")}), what do you think the item is?`
          : `${currentPlayer.name}, what do you think the item is?`}
      </Text>

      <ScrollView style={styles.optionsList}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedOption === option && styles.selectedOption,
            ]}
            onPress={() => handleGuess(option)}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={[
          styles.confirmButton,
          !selectedOption && styles.disabledConfirmButton,
        ]}
        onPress={handleConfirm}
        disabled={!selectedOption}
      >
        <Text style={styles.confirmButtonText}>Confirm Guess</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#1a1a1a",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginTop: 20,
  },
  subtitle: {
    fontSize: 24,
    color: "#cccccc",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  optionsList: {
    flex: 1,
  },
  optionButton: {
    backgroundColor: "#2a2a2a",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
  },
  selectedOption: {
    backgroundColor: "#4CAF50",
  },
  optionText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
  },
  confirmButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  disabledConfirmButton: {
    backgroundColor: "#666666",
  },
  confirmButtonText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
