import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Player } from '../../types/gameTypes';

interface VotingPhaseProps {
  players: Player[];
  currentPlayerIndex: number;
  onPhaseComplete: () => void;
  onPlayerComplete: () => void;
  submitVote: (votedPlayerIndex: number) => void;
}

export const VotingPhase: React.FC<VotingPhaseProps> = ({
  players,
  currentPlayerIndex,
  onPhaseComplete,
  onPlayerComplete,
  submitVote,
}) => {
  return (
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
  playerName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 20,
  },
  instructions: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 40,
    lineHeight: 24,
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
}); 