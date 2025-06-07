import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Player } from "../../types/player";

interface QuestionsPhaseProps {
  players: Player[];
  currentPlayerIndex: number;
  onPhaseComplete: () => void;
  onPlayerComplete: () => void;
  updatePlayer: (playerIndex: number, updates: Partial<Player>) => void;
  assignQuestion: () => void;
}

export const QuestionsPhase: React.FC<QuestionsPhaseProps> = ({
  players,
  currentPlayerIndex,
  onPhaseComplete,
  onPlayerComplete,
  updatePlayer,
  assignQuestion,
}) => {
  const [questionAssignments, setQuestionAssignments] = useState<number[]>([]);
  const [currentAskerIndex, setCurrentAskerIndex] = useState(0);

  // Initialize question assignments when component mounts
  useEffect(() => {
    if (questionAssignments.length === 0) {
      // Create assignments where each player asks one other player
      const assignments = players.map((_, askerIndex) => {
        // Create array of possible targets (excluding the asker)
        const possibleTargets = players
          .map((_, index) => index)
          .filter((index) => index !== askerIndex);

        // Randomly select one target
        const randomIndex = Math.floor(Math.random() * possibleTargets.length);
        return possibleTargets[randomIndex];
      });

      setQuestionAssignments(assignments);
    }
  }, []);

  const handleNextPlayer = () => {
    // Find the next valid asker
    let nextIndex = currentAskerIndex + 1;
    while (
      nextIndex < players.length &&
      questionAssignments[nextIndex] === -1
    ) {
      nextIndex++;
    }

    if (nextIndex >= players.length) {
      onPhaseComplete();
    } else {
      setCurrentAskerIndex(nextIndex);
      onPlayerComplete();
    }
  };

  const currentAsker = players[currentAskerIndex];
  const targetIndex = questionAssignments[currentAskerIndex];
  const currentTarget = targetIndex !== -1 ? players[targetIndex] : null;

  // If current player is not a valid asker, move to next player
  useEffect(() => {
    if (currentTarget === null && currentAskerIndex < players.length) {
      handleNextPlayer();
    }
  }, [currentAskerIndex]);

  // If we've gone through all players, end the phase
  if (currentAskerIndex >= players.length) {
    onPhaseComplete();
    return null;
  }

  if (!currentTarget) {
    return null;
  }

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
        <TouchableOpacity style={styles.actionButton} onPress={assignQuestion}>
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
