import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import { Player } from "../../types/player";
import { GameMode, GAME_MODES } from "../../types/gameModes";
import { getPlayersInTheDark } from "../../utils/players";

interface RevealPhaseProps {
  players: Player[];
  currentPlayerIndex: number;
  selectedItem: string;
  gameMode: GameMode;
  onPhaseComplete: () => void;
  onPlayerComplete: () => void;
  updatePlayer: (playerIndex: number, updates: Partial<Player>) => void;
}

export const RevealPhase: React.FC<RevealPhaseProps> = ({
  players,
  currentPlayerIndex,
  selectedItem,
  gameMode,
  onPhaseComplete,
  onPlayerComplete,
  updatePlayer,
}) => {
  const [showItemModal, setShowItemModal] = useState(false);
  const [showInDarkModal, setShowInDarkModal] = useState(false);

  const showItemToPlayer = () => {
    const currentPlayer = players[currentPlayerIndex];
    if (currentPlayer.isInTheDark) {
      setShowInDarkModal(true);
    } else {
      setShowItemModal(true);
    }

    updatePlayer(currentPlayerIndex, { hasSeenItem: true });
  };

  const getCurrentPlayerTeammates = () => {
    if (gameMode.type !== GAME_MODES.TEAM_KNOWN) {
      return [];
    }

    const currentPlayer = players[currentPlayerIndex];
    if (!currentPlayer.isInTheDark) {
      return [];
    }

    const playersInTheDark = getPlayersInTheDark(players);
    return playersInTheDark.filter(
      (player) => player.name !== currentPlayer.name
    );
  };

  const handleModalClose = () => {
    setShowItemModal(false);
    setShowInDarkModal(false);

    if (currentPlayerIndex === players.length - 1) {
      onPhaseComplete();
    } else {
      onPlayerComplete();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reveal Phase</Text>
      <Text style={styles.playerName}>{players[currentPlayerIndex].name}</Text>

      <TouchableOpacity
        style={styles.showItemButton}
        onPress={showItemToPlayer}
      >
        <Text style={styles.showItemButtonText}>Show Information</Text>
      </TouchableOpacity>

      {/* Modal for players who can see the item */}
      <Modal
        visible={showItemModal}
        transparent={true}
        animationType="fade"
        onRequestClose={handleModalClose}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>The Item Is:</Text>
            <Text style={styles.modalItem}>{selectedItem}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleModalClose}
            >
              <Text style={styles.modalButtonText}>Got it!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal for players who are in the dark */}
      <Modal
        visible={showInDarkModal}
        transparent={true}
        animationType="fade"
        onRequestClose={handleModalClose}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>You are in the dark!</Text>
            <Text style={styles.modalDescription}>
              You will need to figure out what the item is by asking questions
              and listening to other players' responses.
            </Text>

            {gameMode.type === GAME_MODES.TEAM_KNOWN &&
              getCurrentPlayerTeammates().length > 0 && (
                <View style={styles.teammatesSection}>
                  <Text style={styles.teammatesTitle}>Your teammates are:</Text>
                  <ScrollView style={styles.teammatesList}>
                    {getCurrentPlayerTeammates().map((teammate, index) => (
                      <View key={index} style={styles.teammateItem}>
                        <Text style={styles.teammateName}>{teammate.name}</Text>
                      </View>
                    ))}
                  </ScrollView>
                  <Text style={styles.teammatesNote}>
                    Work together to stay hidden and guess the item!
                  </Text>
                </View>
              )}

            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleModalClose}
            >
              <Text style={styles.modalButtonText}>I understand</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginTop: 20,
  },
  playerName: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginTop: 20,
  },
  showItemButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 40,
  },
  showItemButtonText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#333",
    padding: 30,
    borderRadius: 12,
    alignItems: "center",
    width: "80%",
  },
  modalTitle: {
    fontSize: 24,
    color: "#ffffff",
    marginBottom: 20,
  },
  modalItem: {
    fontSize: 36,
    color: "#4CAF50",
    fontWeight: "bold",
    marginBottom: 30,
  },
  modalDescription: {
    fontSize: 18,
    color: "#ffffff",
    textAlign: "center",
    marginVertical: 20,
    lineHeight: 24,
  },
  modalButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  modalButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  teammatesSection: {
    backgroundColor: "#2a2a2a",
    borderRadius: 8,
    padding: 15,
    marginVertical: 20,
    width: "100%",
  },
  teammatesTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4CAF50",
    textAlign: "center",
    marginBottom: 10,
  },
  teammatesList: {
    maxHeight: 120,
    marginBottom: 10,
  },
  teammateItem: {
    backgroundColor: "#1a1a1a",
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  teammateName: {
    fontSize: 16,
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "600",
  },
  teammatesNote: {
    fontSize: 14,
    color: "#cccccc",
    textAlign: "center",
    fontStyle: "italic",
  },
});
