import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Player } from "../../types/player";

interface QuestionsPhaseProps {
  players: Player[];
  currentPlayerIndex: number;
  onPhaseComplete: () => void;
  onPlayerComplete: () => void;
  updatePlayer: (playerIndex: number, updates: Partial<Player>) => void;
  assignQuestion: () => void;
  assignQuestionToPlayer?: (playerIndex: number) => void;
}

export const QuestionsPhase: React.FC<QuestionsPhaseProps> = ({
  players,
  currentPlayerIndex,
  onPhaseComplete,
  onPlayerComplete,
  updatePlayer,
  assignQuestion,
  assignQuestionToPlayer,
}) => {
  // Simple pattern: each player gets asked by the previous player in the array
  // Player 0 gets asked by Player (n-1), Player 1 gets asked by Player 0, etc.
  const currentTarget = players[currentPlayerIndex];
  const currentAskerIndex =
    currentPlayerIndex === 0 ? players.length - 1 : currentPlayerIndex - 1;
  const currentAsker = players[currentAskerIndex];

  const handleNextPlayer = () => {
    if (currentPlayerIndex >= players.length - 1) {
      onPhaseComplete();
    } else {
      onPlayerComplete();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Question Phase</Text>

      <View style={styles.playerInfo}>
        <Text style={styles.playerLabel}>Asking:</Text>
        <Text style={styles.playerName}>{currentAsker.name}</Text>

        <Text style={styles.playerLabel}>To:</Text>
        <Text style={styles.playerName}>{currentTarget.name}</Text>
      </View>

      {!currentAsker.question ? (
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => {
            // Use the new assignQuestionToPlayer function if available,
            // otherwise fallback to the workaround
            if (assignQuestionToPlayer) {
              assignQuestionToPlayer(currentAskerIndex);
            } else {
              // Fallback: assign to current target then move to asker
              assignQuestion();
              if (currentTarget.question && !currentAsker.question) {
                updatePlayer(currentAskerIndex, {
                  question: currentTarget.question,
                });
                updatePlayer(currentPlayerIndex, { question: undefined });
              }
            }
          }}
        >
          <Text style={styles.actionButtonText}>Get Question</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.questionContainer}>
          <Text style={styles.questionLabel}>
            Question for {currentTarget.name}:
          </Text>
          <Text style={styles.question}>{currentAsker.question}</Text>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleNextPlayer}
          >
            <Text style={styles.actionButtonText}>Next Player</Text>
          </TouchableOpacity>
        </View>
      )}
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
  playerInfo: {
    marginTop: 40,
    alignItems: "center",
  },
  playerLabel: {
    fontSize: 18,
    color: "#cccccc",
    marginBottom: 5,
  },
  playerName: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 20,
  },
  questionContainer: {
    backgroundColor: "#2a2a2a",
    padding: 20,
    borderRadius: 12,
    marginTop: 40,
  },
  questionLabel: {
    fontSize: 18,
    color: "#cccccc",
    marginBottom: 10,
  },
  question: {
    fontSize: 24,
    color: "#ffffff",
    fontWeight: "bold",
  },
  actionButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 40,
  },
  actionButtonText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
