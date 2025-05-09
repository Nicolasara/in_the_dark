import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Player } from '../../types/gameTypes';

interface GameOverProps {
  players: Player[];
  selectedItem: string;
  onPlayAgain: () => void;
}

export const GameOver: React.FC<GameOverProps> = ({
  players,
  selectedItem,
  onPlayAgain,
}) => {
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
        style={styles.playAgainButton} 
        onPress={onPlayAgain}
      >
        <Text style={styles.playAgainButtonText}>Play Again</Text>
      </TouchableOpacity>
    </ScrollView>
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
  subtitle: {
    fontSize: 24,
    color: '#cccccc',
    textAlign: 'center',
    marginTop: 10,
  },
  resultContainer: {
    backgroundColor: '#333',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    marginTop: 20,
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
  playAgainButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  playAgainButtonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
}); 