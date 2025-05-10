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
  // Find players in the dark
  const playersInTheDark = players.filter(player => player.isInTheDark);
  const playersNotInTheDark = players.filter(player => !player.isInTheDark);

  // Check if team not in the dark correctly identified who was in the dark
  const mostVotedPlayer = players.reduce((prev, current) => 
    (current.votes > prev.votes) ? current : prev
  );
  const correctlyIdentified = mostVotedPlayer.isInTheDark;

  // Check if players in the dark correctly guessed the item
  const correctGuesses = playersInTheDark.filter(player => 
    player.answer === selectedItem
  ).length;
  const allGuessedCorrectly = correctGuesses === playersInTheDark.length;

  // Determine the winner
  let result: 'notInTheDark' | 'inTheDark' | 'tie';
  if (correctlyIdentified && allGuessedCorrectly) {
    result = 'tie';
  } else if (correctlyIdentified) {
    result = 'notInTheDark';
  } else {
    result = 'inTheDark';
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Game Summary</Text>

      <View style={styles.resultBox}>
        <Text style={styles.resultTitle}>
          {result === 'notInTheDark' ? 'Team Not in the Dark Wins!' :
           result === 'inTheDark' ? 'Team In the Dark Wins!' :
           'It\'s a Tie!'}
        </Text>
        <Text style={styles.resultSubtitle}>
          {result === 'notInTheDark' ? 'They caught the players in the dark!' :
           result === 'inTheDark' ? 'They successfully stayed hidden!' :
           'Both teams achieved their goals!'}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Voting Results</Text>
        <Text style={styles.sectionText}>
          {correctlyIdentified ? 
            'Team Not in the Dark correctly identified who was in the dark!' :
            'Team Not in the Dark did not correctly identify who was in the dark.'}
        </Text>
        <ScrollView style={styles.playerList}>
          {players.map((player, index) => (
            <View key={index} style={styles.playerRow}>
              <Text style={styles.playerName}>{player.name}</Text>
              <Text style={styles.playerVotes}>Votes: {player.votes}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Guessing Results</Text>
        <Text style={styles.sectionText}>
          The item was: {selectedItem}
        </Text>
        <Text style={styles.sectionText}>
          Players in the dark correctly guessed: {correctGuesses} out of {playersInTheDark.length}
        </Text>
        <ScrollView style={styles.playerList}>
          {playersInTheDark.map((player, index) => (
            <View key={index} style={styles.playerRow}>
              <Text style={styles.playerName}>{player.name}</Text>
              <Text style={[
                styles.playerGuess,
                player.answer === selectedItem ? styles.correctGuess : styles.incorrectGuess
              ]}>
                {player.answer || 'No guess'}
              </Text>
            </View>
          ))}
        </ScrollView>
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
    backgroundColor: '#1a1a1a',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 20,
  },
  resultBox: {
    backgroundColor: '#2a2a2a',
    padding: 20,
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 20,
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  resultSubtitle: {
    fontSize: 18,
    color: '#cccccc',
    textAlign: 'center',
    marginTop: 10,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 16,
    color: '#cccccc',
    marginBottom: 10,
  },
  playerList: {
    maxHeight: 200,
  },
  playerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    padding: 10,
    borderRadius: 4,
    marginBottom: 5,
  },
  playerName: {
    fontSize: 16,
    color: '#ffffff',
  },
  playerVotes: {
    fontSize: 16,
    color: '#cccccc',
  },
  playerGuess: {
    fontSize: 16,
  },
  correctGuess: {
    color: '#4CAF50',
  },
  incorrectGuess: {
    color: '#f44336',
  },
  playAgainButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  playAgainButtonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
}); 