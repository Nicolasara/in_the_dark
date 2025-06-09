import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Player } from "../../types/player";
import { calculateGameOutcomes } from "../../utils/winningConditions";
import { GameState, GAME_PHASES } from "../../types/gameState";
import { createGameMode } from "../../utils/gameModes";
import { GameModeType, GAME_MODES } from "../../types/gameModes";
import { getMostVotedPlayer, analyzeVotingResults } from "../../utils/voting";
import { getPlayersInTheDark } from "../../utils/players";
import { GameResult, GAME_RESULTS } from "../../types/gameResult";
import { logger } from "../../utils/logger";

interface GameSummaryProps {
  players: Player[];
  selectedItem: string;
  onPlayAgain: () => void;
  gameModeType?: GameModeType;
}

export const GameSummary: React.FC<GameSummaryProps> = ({
  players,
  selectedItem,
  onPlayAgain,
  gameModeType = GAME_MODES.SINGLE,
}) => {
  // Use utility function to calculate proper game outcomes
  const gameMode = createGameMode({
    type: gameModeType,
    totalPlayers: players.length,
    inTheDarkPlayers: getPlayersInTheDark(players).length,
  });

  const gameState: GameState = {
    players,
    currentPhase: GAME_PHASES.ENDED,
    gameMode,
    outcomes: [],
    secret: selectedItem,
    round: 1,
  };

  const gameOutcome = calculateGameOutcomes(gameState);
  const playersInTheDark = getPlayersInTheDark(players);

  // Use proper voting analysis to determine winner
  const votingAnalysis = analyzeVotingResults(players);
  const { wasCorrectlyIdentified, mostVotedPlayers, isTie, tieBreakWinner } =
    votingAnalysis;

  // Debug logging to understand the issue
  logger.log("=== GameSummary Winning Logic Debug ===");
  logger.log(
    "Players in the dark:",
    playersInTheDark.map((p) => p.name)
  );
  logger.log(
    "Most voted players:",
    mostVotedPlayers.map((p) => ({ name: p.name, isInTheDark: p.isInTheDark }))
  );
  logger.log("Was correctly identified:", wasCorrectlyIdentified);
  logger.log("Is tie:", isTie);
  logger.log("Tie break winner:", tieBreakWinner);

  // Determine winner based on simple game rules:
  // - "In the Loop" wins if they correctly identify at least one "in the dark" player
  // - "In the Dark" wins if they avoid being caught
  let result: GameResult;

  if (wasCorrectlyIdentified || (isTie && tieBreakWinner === "inTheLoop")) {
    result = GAME_RESULTS.IN_THE_LOOP;
  } else if (isTie && tieBreakWinner === "trueTie") {
    result = GAME_RESULTS.TIE;
  } else {
    result = GAME_RESULTS.IN_THE_DARK;
  }

  logger.log("Final result:", result);

  // Keep these for display purposes
  const mostVotedPlayer = getMostVotedPlayer(players);
  const correctlyIdentified = mostVotedPlayer.isInTheDark;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Game Summary</Text>

      <View style={styles.resultBox}>
        <Text style={styles.resultTitle}>
          {result === GAME_RESULTS.IN_THE_LOOP
            ? "Team In the Loop Wins!"
            : result === GAME_RESULTS.IN_THE_DARK
            ? "Team In the Dark Wins!"
            : "It's a Tie!"}
        </Text>
        <Text style={styles.resultSubtitle}>
          {result === GAME_RESULTS.IN_THE_LOOP
            ? "They caught the players in the dark!"
            : result === GAME_RESULTS.IN_THE_DARK
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
