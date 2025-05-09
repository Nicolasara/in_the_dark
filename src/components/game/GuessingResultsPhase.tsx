import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Player } from '../../types/gameTypes';

interface GuessingResultsPhaseProps {
  players: Player[];
  selectedItem: string;
  onPhaseComplete: () => void;
}

export const GuessingResultsPhase: React.FC<GuessingResultsPhaseProps> = ({
  players,
  selectedItem,
  onPhaseComplete,
}) => {
  const playersInTheDark = players.filter(player => player.isInTheDark);
  const correctGuesses = playersInTheDark.filter(player => 
    player.answer?.toLowerCase() === selectedItem.toLowerCase()
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Guessing Results</Text>
      
      <View style={styles.resultBox}>
        <Text style={styles.itemText}>The item was: {selectedItem}</Text>
        <Text style={styles.resultText}>
          {correctGuesses.length > 0
            ? `${correctGuesses.length} player${correctGuesses.length > 1 ? 's' : ''} in the dark correctly guessed the item!`
            : "No players in the dark correctly guessed the item."}
        </Text>
      </View>

      <Text style={styles.subtitle}>Guesses from Players in the Dark</Text>
      <ScrollView style={styles.guessesList}>
        {playersInTheDark.map((player, index) => (
          <View key={index} style={styles.guessItem}>
            <Text style={styles.playerName}>{player.name}</Text>
            <Text style={styles.guessText}>Guessed: {player.answer || 'No guess'}</Text>
            {player.answer && (
              <Text style={[
                styles.resultTag,
                player.answer.toLowerCase() === selectedItem.toLowerCase() 
                  ? styles.correctTag 
                  : styles.incorrectTag
              ]}>
                {player.answer.toLowerCase() === selectedItem.toLowerCase() 
                  ? 'Correct!' 
                  : 'Incorrect'}
              </Text>
            )}
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.continueButton}
        onPress={onPhaseComplete}
      >
        <Text style={styles.continueButtonText}>See Final Results</Text>
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
    marginBottom: 30,
  },
  itemText: {
    fontSize: 24,
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  resultText: {
    fontSize: 20,
    color: '#ffffff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 24,
    color: '#cccccc',
    textAlign: 'center',
    marginBottom: 20,
  },
  guessesList: {
    flex: 1,
  },
  guessItem: {
    backgroundColor: '#2a2a2a',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  playerName: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  guessText: {
    fontSize: 18,
    color: '#cccccc',
  },
  resultTag: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  correctTag: {
    color: '#4CAF50',
  },
  incorrectTag: {
    color: '#f44336',
  },
  continueButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  continueButtonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
}); 