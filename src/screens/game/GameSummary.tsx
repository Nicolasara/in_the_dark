import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Player } from "../../types/player";

interface GameSummaryProps {
  players: Player[];
  selectedItem: string;
  onPlayAgain: () => void;
}

export const GameSummary: React.FC<GameSummaryProps> = ({
  players,
  selectedItem,
  onPlayAgain,
}) => {
  // Find players in the dark
  const playersInTheDark = players.filter((player) => player.isInTheDark);
  const playersNotInTheDark = players.filter((player) => !player.isInTheDark);

  // Check if team not in the dark correctly identified who was in the dark
  const mostVotedPlayer = players.reduce((prev, current) =>
    current.votes > prev.votes ? current : prev
  );
  const correctlyIdentified = mostVotedPlayer.isInTheDark;

  // Check if players in the dark correctly guessed the item
  const correctGuesses = playersInTheDark.filter(
    (player) => player.answer === selectedItem
  ).length;
  const allGuessedCorrectly = correctGuesses === playersInTheDark.length;

  // Determine the winner
  let result: "notInTheDark" | "inTheDark" | "tie";
  if (correctlyIdentified && allGuessedCorrectly) {
    result = "tie";
  } else if (correctlyIdentified) {
    result = "notInTheDark";
  } else {
    result = "inTheDark";
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Game Summary</Text>

      <View style={styles.resultBox}>
        <Text style={styles.resultTitle}>
          {result === "notInTheDark"
            ? "Team Not in the Dark Wins!"
            : result === "inTheDark"
            ? "Team In the Dark Wins!"
            : "It's a Tie!"}
        </Text>
        <Text style={styles.resultSubtitle}>
          {result === "notInTheDark"
            ? "They caught the players in the dark!"
            : result === "inTheDark"
            ? "They successfully stayed hidden!"
            : "Both teams achieved their goals!"}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>The Item Was:</Text>
        <Text style={styles.itemText}>{selectedItem}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Players In The Dark:</Text>
        <View style={styles.playerList}>
          {playersInTheDark.map((player, index) => (
            <View key={index} style={styles.playerRow}>
              <Text style={styles.playerName}>{player.name}</Text>
              <Text
                style={[
                  styles.playerGuess,
                  player.answer === selectedItem
                    ? styles.correctGuess
                    : styles.incorrectGuess,
                ]}
              >
                {player.answer || "No guess"}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Most Voted Player:</Text>
        <Text style={styles.playerName}>{mostVotedPlayer.name}</Text>
        <Text style={styles.voteResult}>
          {correctlyIdentified
            ? "Correctly Identified!"
            : "Not Correctly Identified"}
        </Text>
      </View>

      <TouchableOpacity style={styles.playAgainButton} onPress={onPlayAgain}>
        <Text style={styles.playAgainButtonText}>Play Again</Text>
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
  resultBox: {
    backgroundColor: "#2a2a2a",
    padding: 20,
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 20,
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
  },
  resultSubtitle: {
    fontSize: 18,
    color: "#cccccc",
    textAlign: "center",
    marginTop: 10,
  },
  section: {
    marginBottom: 20,
    backgroundColor: "#2a2a2a",
    padding: 15,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 10,
  },
  itemText: {
    fontSize: 24,
    color: "#4CAF50",
    fontWeight: "bold",
    textAlign: "center",
  },
  playerList: {
    marginTop: 10,
  },
  playerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  playerName: {
    fontSize: 18,
    color: "#ffffff",
  },
  playerGuess: {
    fontSize: 16,
  },
  correctGuess: {
    color: "#4CAF50",
  },
  incorrectGuess: {
    color: "#f44336",
  },
  voteResult: {
    fontSize: 18,
    color: "#4CAF50",
    textAlign: "center",
    marginTop: 10,
  },
  playAgainButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  playAgainButtonText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
