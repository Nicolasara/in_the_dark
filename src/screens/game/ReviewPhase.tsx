import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Player } from "../../types/gameTypes";

interface ReviewPhaseProps {
  players: Player[];
  onPhaseComplete: () => void;
}

export const ReviewPhase: React.FC<ReviewPhaseProps> = ({
  players,
  onPhaseComplete,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Review Questions</Text>
      <Text style={styles.subtitle}>Review all questions before voting</Text>

      <ScrollView style={styles.scrollView}>
        {players.map((player, index) => (
          <View key={index} style={styles.playerCard}>
            <Text style={styles.playerName}>{player.name}</Text>
            <Text style={styles.question}>{player.question}</Text>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.button} onPress={onPhaseComplete}>
        <Text style={styles.buttonText}>Start Voting</Text>
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
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
    marginBottom: 20,
  },
  playerCard: {
    backgroundColor: "#2a2a2a",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  playerName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 5,
  },
  question: {
    fontSize: 18,
    color: "#cccccc",
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
