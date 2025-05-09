import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { Player } from '../../types/gameTypes';

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
  const handleNextPlayer = () => {
    if (currentPlayerIndex === players.length - 1) {
      onPhaseComplete();
    } else {
      onPlayerComplete();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Question Phase</Text>
      <Text style={styles.playerName}>{players[currentPlayerIndex].name}</Text>
      
      {!players[currentPlayerIndex].question ? (
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={assignQuestion}
        >
          <Text style={styles.actionButtonText}>Get Question</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.questionContainer}>
          <Text style={styles.questionLabel}>Your Question:</Text>
          <Text style={styles.question}>{players[currentPlayerIndex].question}</Text>
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
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 20,
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
  actionButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 40,
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
}); 