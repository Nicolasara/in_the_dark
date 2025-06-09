import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigation";
import { Player } from "../types/player";
import { GamePhase, GAME_PHASES } from "../types/gameState";
import { gameData } from "../data/gameData";
import { generateStartingPlayers, shuffleArray } from "../utils/players";
import { createGameMode } from "../utils/gameModes";
import { GAME_MODES } from "../types/gameModes";
import { SetupPhase } from "./game/SetupPhase";
import { RevealPhase } from "./game/RevealPhase";
import { QuestionsPhase } from "./game/QuestionsPhase";
import { ReviewPhase } from "./game/ReviewPhase";
import { VotingPhase } from "./game/VotingPhase";
import { VoteResultsPhase } from "./game/VoteResultsPhase";
import { GuessingPhase } from "./game/GuessingPhase";
import { GuessingResultsPhase } from "./game/GuessingResultsPhase";
import { GameSummary } from "./game/GameSummary";

type GameScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Game"
>;
type GameScreenRouteProp = RouteProp<RootStackParamList, "Game">;

interface GameScreenProps {
  navigation: GameScreenNavigationProp;
  route: GameScreenRouteProp;
}

export const GameScreen: React.FC<GameScreenProps> = ({
  navigation,
  route,
}) => {
  const { playerNames, category, gameModeConfig } = route.params;
  const categoryData = gameData[category];

  const [players, setPlayers] = useState<Player[]>([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState("");
  const [gamePhase, setGamePhase] = useState<GamePhase>(GAME_PHASES.SETUP);
  const [availableQuestions, setAvailableQuestions] = useState<string[]>([]);
  const [gameMode, setGameMode] = useState(createGameMode(gameModeConfig));

  useEffect(() => {
    // Initialize players using utility function
    const gameMode = createGameMode(gameModeConfig);
    const initialPlayers = generateStartingPlayers(gameMode, playerNames);

    // Randomize player order to prevent predictable reveal patterns
    // This ensures "in the dark" players aren't always revealed first
    const shuffledPlayers = shuffleArray([...initialPlayers]);
    setPlayers(shuffledPlayers);
  }, [playerNames, gameModeConfig]);

  const startGame = () => {
    // Players are already assigned "in the dark" status by generateStartingPlayers

    // Select random item using proper shuffle algorithm
    const shuffledItems = shuffleArray([...categoryData.items]);
    setSelectedItem(shuffledItems[0]);

    // Initialize available questions with proper shuffle algorithm
    const shuffledQuestions = shuffleArray([...categoryData.questions]);
    setAvailableQuestions(shuffledQuestions);

    setGamePhase(GAME_PHASES.REVEAL);
    setCurrentPlayerIndex(0);
  };

  const assignQuestion = () => {
    if (availableQuestions.length === 0) return;

    const randomQuestionIndex = Math.floor(
      Math.random() * availableQuestions.length
    );
    const question = availableQuestions[randomQuestionIndex];

    setAvailableQuestions(
      availableQuestions.filter((_, i) => i !== randomQuestionIndex)
    );

    const updatedPlayers = [...players];
    updatedPlayers[currentPlayerIndex].question = question;
    setPlayers(updatedPlayers);
  };

  const assignQuestionToPlayer = (playerIndex: number) => {
    if (availableQuestions.length === 0) return;

    const randomQuestionIndex = Math.floor(
      Math.random() * availableQuestions.length
    );
    const question = availableQuestions[randomQuestionIndex];

    setAvailableQuestions(
      availableQuestions.filter((_, i) => i !== randomQuestionIndex)
    );

    const updatedPlayers = [...players];
    updatedPlayers[playerIndex].question = question;
    setPlayers(updatedPlayers);
  };

  const submitVote = (votedPlayerIndex: number) => {
    const updatedPlayers = [...players];
    updatedPlayers[votedPlayerIndex].votes += 1;
    updatedPlayers[currentPlayerIndex].hasVoted = true;
    setPlayers(updatedPlayers);

    // Check if all players have voted
    const allPlayersVoted = updatedPlayers.every((player) => player.hasVoted);

    if (allPlayersVoted) {
      setGamePhase(GAME_PHASES.VOTE_RESULTS);
    } else {
      // Move to next player who hasn't voted yet
      let nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
      while (updatedPlayers[nextPlayerIndex].hasVoted) {
        nextPlayerIndex = (nextPlayerIndex + 1) % players.length;
      }
      setCurrentPlayerIndex(nextPlayerIndex);
    }
  };

  const updatePlayer = (playerIndex: number, updates: Partial<Player>) => {
    const updatedPlayers = [...players];
    updatedPlayers[playerIndex] = {
      ...updatedPlayers[playerIndex],
      ...updates,
    };
    setPlayers(updatedPlayers);
  };

  const updateMultiplePlayers = (
    playerUpdates: { playerIndex: number; updates: Partial<Player> }[]
  ) => {
    const updatedPlayers = [...players];
    playerUpdates.forEach(({ playerIndex, updates }) => {
      updatedPlayers[playerIndex] = {
        ...updatedPlayers[playerIndex],
        ...updates,
      };
    });
    setPlayers(updatedPlayers);
  };

  const handlePlayerComplete = () => {
    if (gamePhase === GAME_PHASES.GUESSING) {
      const isTeamMode =
        gameMode.type === GAME_MODES.TEAM_KNOWN ||
        gameMode.type === GAME_MODES.TEAM_UNKNOWN;

      if (isTeamMode) {
        // Team mode: All players in the dark make one collective guess
        // Once any player makes a guess, the phase is complete
        handlePhaseComplete();
        return;
      }

      // Individual/Single mode: Each player gets their own turn
      const playersInTheDark = players.filter((player) => player.isInTheDark);
      const playersWithGuesses = playersInTheDark.filter(
        (player) => player.answer
      );

      if (playersWithGuesses.length >= playersInTheDark.length) {
        // All players in the dark have made their guess, move to next phase
        handlePhaseComplete();
        return;
      }

      // Find the next player who is in the dark and hasn't made a guess yet
      let nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
      while (nextPlayerIndex !== currentPlayerIndex) {
        const nextPlayer = players[nextPlayerIndex];
        if (nextPlayer.isInTheDark && !nextPlayer.answer) {
          setCurrentPlayerIndex(nextPlayerIndex);
          return;
        }
        nextPlayerIndex = (nextPlayerIndex + 1) % players.length;
      }
      // If we've gone through all players and couldn't find one without a guess, move to next phase
      handlePhaseComplete();
    } else {
      setCurrentPlayerIndex(currentPlayerIndex + 1);
    }
  };

  const handlePhaseComplete = () => {
    setCurrentPlayerIndex(0);
    switch (gamePhase) {
      case GAME_PHASES.REVEAL:
        setGamePhase(GAME_PHASES.QUESTIONS);
        break;
      case GAME_PHASES.QUESTIONS:
        setGamePhase(GAME_PHASES.REVIEW);
        break;
      case GAME_PHASES.REVIEW:
        setGamePhase(GAME_PHASES.VOTING);
        break;
      case GAME_PHASES.VOTING:
        setGamePhase(GAME_PHASES.VOTE_RESULTS);
        break;
      case GAME_PHASES.VOTE_RESULTS:
        // Find the first player who is in the dark and hasn't made a guess yet
        const firstDarkPlayerIndex = players.findIndex(
          (player) => player.isInTheDark && !player.answer
        );
        setCurrentPlayerIndex(
          firstDarkPlayerIndex >= 0 ? firstDarkPlayerIndex : 0
        );
        setGamePhase(GAME_PHASES.GUESSING);
        break;
      case GAME_PHASES.GUESSING:
        setGamePhase(GAME_PHASES.GUESSING_RESULTS);
        break;
      case GAME_PHASES.GUESSING_RESULTS:
        setGamePhase(GAME_PHASES.ENDED);
        break;
    }
  };

  return (
    <View style={styles.container}>
      {gamePhase === GAME_PHASES.SETUP && (
        <SetupPhase onStartGame={startGame} />
      )}
      {gamePhase === GAME_PHASES.REVEAL && players.length > 0 && (
        <RevealPhase
          players={players}
          currentPlayerIndex={currentPlayerIndex}
          selectedItem={selectedItem}
          gameMode={gameMode}
          onPhaseComplete={handlePhaseComplete}
          onPlayerComplete={handlePlayerComplete}
          updatePlayer={updatePlayer}
        />
      )}
      {gamePhase === GAME_PHASES.QUESTIONS && players.length > 0 && (
        <QuestionsPhase
          players={players}
          currentPlayerIndex={currentPlayerIndex}
          onPhaseComplete={handlePhaseComplete}
          onPlayerComplete={handlePlayerComplete}
          updatePlayer={updatePlayer}
          assignQuestion={assignQuestion}
          assignQuestionToPlayer={assignQuestionToPlayer}
        />
      )}
      {gamePhase === GAME_PHASES.REVIEW && players.length > 0 && (
        <ReviewPhase players={players} onPhaseComplete={handlePhaseComplete} />
      )}
      {gamePhase === GAME_PHASES.VOTING && players.length > 0 && (
        <VotingPhase
          players={players}
          currentPlayerIndex={currentPlayerIndex}
          onPhaseComplete={handlePhaseComplete}
          onPlayerComplete={handlePlayerComplete}
          submitVote={submitVote}
        />
      )}
      {gamePhase === GAME_PHASES.VOTE_RESULTS && players.length > 0 && (
        <VoteResultsPhase
          players={players}
          onPhaseComplete={handlePhaseComplete}
        />
      )}
      {gamePhase === GAME_PHASES.GUESSING && players.length > 0 && (
        <GuessingPhase
          players={players}
          currentPlayerIndex={currentPlayerIndex}
          selectedItem={selectedItem}
          categoryItems={categoryData.items}
          gameMode={gameMode}
          onPhaseComplete={handlePhaseComplete}
          onPlayerComplete={handlePlayerComplete}
          updatePlayer={updatePlayer}
          updateMultiplePlayers={updateMultiplePlayers}
        />
      )}
      {gamePhase === GAME_PHASES.GUESSING_RESULTS && players.length > 0 && (
        <GuessingResultsPhase
          players={players}
          selectedItem={selectedItem}
          onPhaseComplete={handlePhaseComplete}
        />
      )}
      {gamePhase === GAME_PHASES.ENDED && players.length > 0 && (
        <GameSummary
          players={players}
          selectedItem={selectedItem}
          onPlayAgain={() => navigation.navigate("Title")}
          gameModeType={gameMode.type}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
  },
});
