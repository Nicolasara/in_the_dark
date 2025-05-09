import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { Player, GamePhase } from '../types/gameTypes';
import { gameData } from '../data/gameData';
import { SetupPhase } from '../components/game/SetupPhase';
import { RevealPhase } from '../components/game/RevealPhase';
import { QuestionsPhase } from '../components/game/QuestionsPhase';
import { ReviewPhase } from '../components/game/ReviewPhase';
import { VotingPhase } from '../components/game/VotingPhase';
import { GameOver } from '../components/game/GameOver';

type GameScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Game'>;
type GameScreenRouteProp = RouteProp<RootStackParamList, 'Game'>;

interface GameScreenProps {
  navigation: GameScreenNavigationProp;
  route: GameScreenRouteProp;
}

export const GameScreen: React.FC<GameScreenProps> = ({ navigation, route }) => {
  const { players: playerNames, category } = route.params;
  const categoryData = gameData[category];
  
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState('');
  const [gamePhase, setGamePhase] = useState<GamePhase>('setup');
  const [availableQuestions, setAvailableQuestions] = useState<string[]>([]);

  useEffect(() => {
    // Initialize players
    const initialPlayers = playerNames.map(name => ({
      name,
      isInTheDark: false,
      hasSeenItem: false,
      votes: 0,
      hasVoted: false,
    }));
    setPlayers(initialPlayers);
  }, [playerNames]);

  const startGame = () => {
    // Randomly select players to be "in the dark" (about 1/3 of players)
    const darkCount = Math.max(1, Math.floor(players.length / 3));
    const updatedPlayers = [...players];
    
    for (let i = 0; i < darkCount; i++) {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * players.length);
      } while (updatedPlayers[randomIndex].isInTheDark);
      
      updatedPlayers[randomIndex].isInTheDark = true;
    }
    
    setPlayers(updatedPlayers);
    
    // Select random item
    const randomItemIndex = Math.floor(Math.random() * categoryData.items.length);
    setSelectedItem(categoryData.items[randomItemIndex]);
    
    // Initialize available questions
    setAvailableQuestions([...categoryData.questions]);
    
    setGamePhase('reveal');
    setCurrentPlayerIndex(0);
  };

  const assignQuestion = () => {
    if (availableQuestions.length === 0) return;

    const randomQuestionIndex = Math.floor(Math.random() * availableQuestions.length);
    const question = availableQuestions[randomQuestionIndex];
    
    setAvailableQuestions(availableQuestions.filter((_, i) => i !== randomQuestionIndex));
    
    const updatedPlayers = [...players];
    updatedPlayers[currentPlayerIndex].question = question;
    setPlayers(updatedPlayers);
  };

  const submitVote = (votedPlayerIndex: number) => {
    const updatedPlayers = [...players];
    updatedPlayers[votedPlayerIndex].votes += 1;
    updatedPlayers[currentPlayerIndex].hasVoted = true;
    setPlayers(updatedPlayers);

    // Check if all players have voted
    const allPlayersVoted = updatedPlayers.every(player => player.hasVoted);
    
    if (allPlayersVoted) {
      setGamePhase('ended');
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
    updatedPlayers[playerIndex] = { ...updatedPlayers[playerIndex], ...updates };
    setPlayers(updatedPlayers);
  };

  const handlePlayerComplete = () => {
    setCurrentPlayerIndex(currentPlayerIndex + 1);
  };

  const handlePhaseComplete = () => {
    setCurrentPlayerIndex(0);
    switch (gamePhase) {
      case 'reveal':
        setGamePhase('questions');
        break;
      case 'questions':
        setGamePhase('review');
        break;
      case 'review':
        setGamePhase('voting');
        break;
      case 'voting':
        setGamePhase('ended');
        break;
    }
  };

  return (
    <View style={styles.container}>
      {gamePhase === 'setup' && (
        <SetupPhase onStartGame={startGame} />
      )}
      {gamePhase === 'reveal' && players.length > 0 && (
        <RevealPhase
          players={players}
          currentPlayerIndex={currentPlayerIndex}
          selectedItem={selectedItem}
          onPhaseComplete={handlePhaseComplete}
          onPlayerComplete={handlePlayerComplete}
          updatePlayer={updatePlayer}
        />
      )}
      {gamePhase === 'questions' && players.length > 0 && (
        <QuestionsPhase
          players={players}
          currentPlayerIndex={currentPlayerIndex}
          onPhaseComplete={handlePhaseComplete}
          onPlayerComplete={handlePlayerComplete}
          updatePlayer={updatePlayer}
          assignQuestion={assignQuestion}
        />
      )}
      {gamePhase === 'review' && players.length > 0 && (
        <ReviewPhase
          players={players}
          onPhaseComplete={handlePhaseComplete}
        />
      )}
      {gamePhase === 'voting' && players.length > 0 && (
        <VotingPhase
          players={players}
          currentPlayerIndex={currentPlayerIndex}
          onPhaseComplete={handlePhaseComplete}
          onPlayerComplete={handlePlayerComplete}
          submitVote={submitVote}
        />
      )}
      {gamePhase === 'ended' && players.length > 0 && (
        <GameOver
          players={players}
          selectedItem={selectedItem}
          onPlayAgain={() => navigation.navigate('Title')}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
}); 