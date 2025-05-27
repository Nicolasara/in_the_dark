import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

interface SetupPhaseProps {
  onStartGame: () => void;
}

export const SetupPhase: React.FC<SetupPhaseProps> = ({ onStartGame }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Game Setup</Text>
      <Text style={styles.subtitle}>Pass the device to each player</Text>
      <Text style={styles.instructions}>
        When you start the game, some players will be "in the dark" and won't
        know the item. Other players will see the item and need to help others
        guess it through questions.
      </Text>
      <TouchableOpacity style={styles.startButton} onPress={onStartGame}>
        <Text style={styles.startButtonText}>Start Game</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
  },
  instructions: {
    fontSize: 18,
    color: "#ffffff",
    textAlign: "center",
    marginTop: 30,
    marginBottom: 40,
    lineHeight: 24,
  },
  startButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  startButtonText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
