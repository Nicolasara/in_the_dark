import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { Player } from '../../types/gameTypes';

interface VotingPhaseProps {
  players: Player[];
  currentPlayerIndex: number;
  onPhaseComplete: () => void;
  onPlayerComplete: () => void;
  submitVote: (playerIndex: number) => void;
}

export const VotingPhase: React.FC<VotingPhaseProps> = ({
  players,
  currentPlayerIndex,
  onPhaseComplete,
  onPlayerComplete,
  submitVote,
}) => {
  const [selectedPlayerIndex, setSelectedPlayerIndex] = useState<number | null>(null);

  const currentPlayer = players[currentPlayerIndex];
  const hasVoted = currentPlayer.hasVoted;

  const handleVoteSelect = (playerIndex: number) => {
    setSelectedPlayerIndex(playerIndex);
  };

  const handleConfirmVote = () => {
    if (selectedPlayerIndex !== null) {
      submitVote(selectedPlayerIndex);
      setSelectedPlayerIndex(null);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Voting Phase</Text>
      <Text style={styles.subtitle}>
        {hasVoted
          ? "You've already voted. Waiting for other players..."
          : `It's ${currentPlayer.name}'s turn to vote`}
      </Text>
      <Text style={styles.instructions}>
        Who do you think is in the dark?
      </Text>

      <View style={styles.playerList}>
        {players.map((player, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.playerButton,
              index === currentPlayerIndex && styles.disabledButton,
              selectedPlayerIndex === index && styles.selectedButton,
            ]}
            onPress={() => handleVoteSelect(index)}
            disabled={hasVoted || index === currentPlayerIndex}
          >
            <Text style={styles.playerButtonText}>{player.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[
          styles.confirmButton,
          (selectedPlayerIndex === null || hasVoted) && styles.disabledConfirmButton,
        ]}
        onPress={handleConfirmVote}
        disabled={selectedPlayerIndex === null || hasVoted}
      >
        <Text style={styles.confirmButtonText}>Confirm</Text>
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
    marginTop: 20,
    marginBottom: 30,
  },
  playerList: {
    flex: 1,
    justifyContent: 'center',
  },
  playerButton: {
    backgroundColor: '#2a2a2a',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  playerButtonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#1a1a1a',
    opacity: 0.5,
  },
  selectedButton: {
    backgroundColor: '#4CAF50',
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  disabledConfirmButton: {
    backgroundColor: '#666666',
  },
  confirmButtonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
}); 