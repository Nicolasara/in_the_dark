import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { gameData } from '../data/gameData';

type GameScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Game'>;
type GameScreenRouteProp = RouteProp<RootStackParamList, 'Game'>;

interface GameScreenProps {
  navigation: GameScreenNavigationProp;
  route: GameScreenRouteProp;
}

interface Player {
  name: string;
  isInTheDark: boolean;
  hasSeenItem: boolean;
  question?: string;
  answer?: string;
  votes: number;
  hasVoted: boolean;
}

type GamePhase = 'setup' | 'reveal' | 'questions' | 'review' | 'voting' | 'ended';

export const GameScreen: React.FC<GameScreenProps> = ({ navigation, route }) => {
  const { players: playerNames, category } = route.params;
  const categoryData = gameData[category];
  
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState('');
  const [showItemModal, setShowItemModal] = useState(false);
  const [gamePhase, setGamePhase] = useState<GamePhase>('setup');
  const [availableQuestions, setAvailableQuestions] = useState<string[]>([]);
  const [votingComplete, setVotingComplete] = useState(false);

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
    
    // Set game phase to reveal
    setGamePhase('reveal');
    setCurrentPlayerIndex(0);
  };

  const showItemToPlayer = () => {
    const currentPlayer = players[currentPlayerIndex];
    if (!currentPlayer.isInTheDark) {
      setShowItemModal(true);
    }
    
    // Mark player as having seen the item
    const updatedPlayers = [...players];
    updatedPlayers[currentPlayerIndex].hasSeenItem = true;
    setPlayers(updatedPlayers);

    // Move to next player or next phase
    if (currentPlayerIndex === players.length - 1) {
      if (gamePhase === 'reveal') {
        setGamePhase('questions');
        setCurrentPlayerIndex(0);
      } else if (gamePhase === 'questions') {
        setGamePhase('review');
      }
    } else {
      setCurrentPlayerIndex(currentPlayerIndex + 1);
    }
  };

  const assignQuestion = () => {
    if (availableQuestions.length === 0) {
      Alert.alert('Error', 'No more questions available');
      return;
    }

    const randomQuestionIndex = Math.floor(Math.random() * availableQuestions.length);
    const question = availableQuestions[randomQuestionIndex];
    
    // Remove question from available questions
    setAvailableQuestions(availableQuestions.filter((_, i) => i !== randomQuestionIndex));
    
    // Assign question to current player
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

  const renderSetupScreen = () => (
    <View style={styles.container}>
      <Text style={styles.title}>Game Setup</Text>
      <Text style={styles.subtitle}>Pass the device to each player</Text>
      <Text style={styles.instructions}>
        When you start the game, some players will be "in the dark" and won't know the item.
        Other players will see the item and need to help others guess it through questions.
      </Text>
      <TouchableOpacity style={styles.startButton} onPress={startGame}>
        <Text style={styles.startButtonText}>Start Game</Text>
      </TouchableOpacity>
    </View>
  );

  const renderRevealScreen = () => (
    <View style={styles.container}>
      <Text style={styles.title}>Reveal Phase</Text>
      <Text style={styles.playerName}>{players[currentPlayerIndex].name}</Text>
      
      <TouchableOpacity 
        style={styles.showItemButton} 
        onPress={showItemToPlayer}
      >
        <Text style={styles.showItemButtonText}>
          {players[currentPlayerIndex].isInTheDark ? 'You are in the dark' : 'Show Item'}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={showItemModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowItemModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>The Item Is:</Text>
            <Text style={styles.modalItem}>{selectedItem}</Text>
            <TouchableOpacity 
              style={styles.modalButton}
              onPress={() => setShowItemModal(false)}
            >
              <Text style={styles.modalButtonText}>Got it!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );

  const renderQuestionsScreen = () => (
    <View style={styles.container}>
      <Text style={styles.title}>Question Phase</Text>
      <Text style={styles.playerName}>{players[currentPlayerIndex].name}</Text>
      
      {!players[currentPlayerIndex].question ? (
        <TouchableOpacity 
          style={styles.showItemButton} 
          onPress={assignQuestion}
        >
          <Text style={styles.showItemButtonText}>Get Question</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.questionContainer}>
          <Text style={styles.questionLabel}>Your Question:</Text>
          <Text style={styles.question}>{players[currentPlayerIndex].question}</Text>
          <TouchableOpacity 
            style={styles.showItemButton} 
            onPress={showItemToPlayer}
          >
            <Text style={styles.showItemButtonText}>Next Player</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  const renderReviewScreen = () => (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Review Phase</Text>
      <Text style={styles.subtitle}>All Questions and Answers</Text>
      
      {players.map((player, index) => (
        <View key={index} style={styles.reviewItem}>
          <Text style={styles.playerName}>{player.name}</Text>
          <Text style={styles.question}>{player.question}</Text>
        </View>
      ))}

      <TouchableOpacity 
        style={styles.startButton} 
        onPress={() => setGamePhase('voting')}
      >
        <Text style={styles.startButtonText}>Start Voting</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderVotingScreen = () => (
    <View style={styles.container}>
      <Text style={styles.title}>Voting Phase</Text>
      <Text style={styles.subtitle}>Private Vote</Text>
      <Text style={styles.playerName}>{players[currentPlayerIndex].name}</Text>
      <Text style={styles.instructions}>
        Vote for who you think is in the dark.
        Your vote will be kept secret until the end of the game.
      </Text>
      
      <ScrollView style={styles.votingList}>
        {players.map((player, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.voteButton,
              index === currentPlayerIndex && styles.voteButtonDisabled
            ]}
            onPress={() => submitVote(index)}
            disabled={index === currentPlayerIndex}
          >
            <Text style={styles.voteButtonText}>{player.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderEndedScreen = () => {
    const darkPlayers = players.filter(p => p.isInTheDark);
    const mostVotedPlayer = players.reduce((prev, current) => 
      (current.votes > prev.votes) ? current : prev
    );

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Game Over</Text>
        <Text style={styles.subtitle}>The item was: {selectedItem}</Text>
        
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Players in the dark:</Text>
          {darkPlayers.map((player, index) => (
            <Text key={index} style={styles.resultText}>{player.name}</Text>
          ))}
        </View>

        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Voting Results:</Text>
          {players.map((player, index) => (
            <View key={index} style={styles.voteResultItem}>
              <Text style={styles.resultText}>{player.name}</Text>
              <Text style={styles.voteCount}>Votes: {player.votes}</Text>
            </View>
          ))}
        </View>

        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Most voted player:</Text>
          <Text style={styles.resultText}>{mostVotedPlayer.name}</Text>
          <Text style={styles.resultText}>Votes: {mostVotedPlayer.votes}</Text>
        </View>

        <TouchableOpacity 
          style={styles.startButton} 
          onPress={() => navigation.navigate('Title')}
        >
          <Text style={styles.startButtonText}>Play Again</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  // Add console logs for debugging
  console.log('Current Game Phase:', gamePhase);
  console.log('Current Player Index:', currentPlayerIndex);
  console.log('Players:', players);

  return (
    <View style={styles.container}>
      {gamePhase === 'setup' && renderSetupScreen()}
      {gamePhase === 'reveal' && renderRevealScreen()}
      {gamePhase === 'questions' && renderQuestionsScreen()}
      {gamePhase === 'review' && renderReviewScreen()}
      {gamePhase === 'voting' && renderVotingScreen()}
      {gamePhase === 'ended' && renderEndedScreen()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 24,
    color: '#cccccc',
    textAlign: 'center',
    marginTop: 10,
  },
  instructions: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 40,
    lineHeight: 24,
  },
  startButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  startButtonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  playerName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 20,
  },
  questionContainer: {
    backgroundColor: '#333',
    padding: 20,
    borderRadius: 12,
    marginTop: 40,
  },
  questionLabel: {
    fontSize: 18,
    color: '#cccccc',
    marginBottom: 10,
  },
  question: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  showItemButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 40,
  },
  showItemButtonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#333',
    padding: 30,
    borderRadius: 12,
    alignItems: 'center',
    width: '80%',
  },
  modalTitle: {
    fontSize: 24,
    color: '#ffffff',
    marginBottom: 20,
  },
  modalItem: {
    fontSize: 36,
    color: '#4CAF50',
    fontWeight: 'bold',
    marginBottom: 30,
  },
  modalButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  reviewItem: {
    backgroundColor: '#333',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  votingList: {
    flex: 1,
    width: '100%',
    marginTop: 20,
  },
  voteButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  voteButtonDisabled: {
    backgroundColor: '#666',
    opacity: 0.5,
  },
  voteButtonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  votedText: {
    color: '#ffffff',
    fontSize: 14,
    fontStyle: 'italic',
    marginTop: 5,
  },
  voteResultItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  voteCount: {
    fontSize: 18,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  resultContainer: {
    backgroundColor: '#333',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  resultTitle: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  resultText: {
    fontSize: 18,
    color: '#ffffff',
  },
}); 