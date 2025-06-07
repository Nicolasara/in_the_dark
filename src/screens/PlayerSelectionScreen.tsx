import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigation";
import {
  createGameMode,
  calculateMaxInTheDarkPlayers,
} from "../utils/gameModes";
import { GameModeType } from "../types/gameModes";

type PlayerSelectionScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "PlayerSelection"
>;
type PlayerSelectionScreenRouteProp = RouteProp<
  RootStackParamList,
  "PlayerSelection"
>;

interface PlayerSelectionScreenProps {
  navigation: PlayerSelectionScreenNavigationProp;
  route: PlayerSelectionScreenRouteProp;
}

export const PlayerSelectionScreen: React.FC<PlayerSelectionScreenProps> = ({
  navigation,
}) => {
  const defaultPlayers = __DEV__
    ? ["Alice", "Bob", "Charlie", "David", "Eve"]
    : [];
  const [players, setPlayers] = useState<string[]>(defaultPlayers);
  const [newPlayerName, setNewPlayerName] = useState("");

  const addPlayer = () => {
    if (newPlayerName.trim() === "") {
      Alert.alert("Error", "Please enter a player name");
      return;
    }

    if (players.includes(newPlayerName.trim())) {
      Alert.alert("Error", "This player name already exists");
      return;
    }

    setPlayers([...players, newPlayerName.trim()]);
    setNewPlayerName("");
  };

  const removePlayer = (index: number) => {
    const newPlayers = [...players];
    newPlayers.splice(index, 1);
    setPlayers(newPlayers);
  };

  const startGame = () => {
    if (players.length < 3) {
      Alert.alert("Error", "You need at least 3 players to start the game");
      return;
    }

    // Use utility to create proper game mode configuration
    const gameMode: GameModeType = "single";
    const gameModeConfig = {
      type: gameMode,
      totalPlayers: players.length,
      inTheDarkPlayers: calculateMaxInTheDarkPlayers(players.length, gameMode),
    };

    navigation.navigate("CategorySelection", {
      gameModeConfig,
      playerNames: players,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Players</Text>
      <Text style={styles.subtitle}>Add at least 3 players to start</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter player name"
          placeholderTextColor="#666"
          value={newPlayerName}
          onChangeText={setNewPlayerName}
          onSubmitEditing={addPlayer}
        />
        <TouchableOpacity style={styles.addButton} onPress={addPlayer}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.playerList}>
        {players.map((player, index) => (
          <View key={index} style={styles.playerItem}>
            <Text style={styles.playerName}>{player}</Text>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removePlayer(index)}
            >
              <Text style={styles.removeButtonText}>×</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={[
          styles.startButton,
          players.length < 3 && styles.startButtonDisabled,
        ]}
        onPress={startGame}
        disabled={players.length < 3}
      >
        <Text style={styles.startButtonText}>Start Game</Text>
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
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginVertical: 20,
  },
  subtitle: {
    fontSize: 18,
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: "#333",
    borderRadius: 8,
    padding: 12,
    color: "#ffffff",
    marginRight: 10,
  },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 8,
    justifyContent: "center",
  },
  addButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  playerList: {
    flex: 1,
  },
  playerItem: {
    flexDirection: "row",
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
  },
  playerName: {
    flex: 1,
    color: "#ffffff",
    fontSize: 18,
  },
  removeButton: {
    padding: 5,
  },
  removeButtonText: {
    color: "#ff4444",
    fontSize: 24,
    fontWeight: "bold",
  },
  startButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  startButtonDisabled: {
    backgroundColor: "#666",
  },
  startButtonText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
