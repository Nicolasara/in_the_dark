import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";

type TitleScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Title"
>;

interface TitleScreenProps {
  navigation: TitleScreenNavigationProp;
}

export const TitleScreen: React.FC<TitleScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>In The Dark</Text>
        <Text style={styles.subtitle}>Local Multiplayer Game</Text>
      </View>

      <TouchableOpacity
        style={styles.startButton}
        onPress={() => navigation.navigate("PlayerSelection")}
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
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 100,
  },
  titleContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#ffffff",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  subtitle: {
    fontSize: 24,
    color: "#cccccc",
    marginTop: 10,
  },
  startButton: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  startButtonText: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
  },
});
