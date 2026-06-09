import { useEffect, useState } from 'react';
import { Alert, FlatList, Modal, Text, TextInput, TouchableOpacity, View, } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useSQLiteContext } from 'expo-sqlite';
import AddDeck from './AddDeck';
import EditDeck from './EditDeck';
import { deleteDeck, fetchDecks, saveDeck, } from '../database/dbFunctions';
import OptionsButton from './OptionsButton';
import styles from './styles'

export default function HomeScreen() {
  const db = useSQLiteContext(); //accessing the database
  const navigation = useNavigation();

  const [decks, setDecks] = useState([]);
  const [selectedDeck, setSelectedDeck] = useState(null);

  const loadDecks = async () => {
    const fetched = await fetchDecks(db);
    setDecks(fetched);
  }

  useEffect(() => {
    loadDecks();
  }, []);

  const handleDeleteDeck = async (id) => {
    Alert.alert(
      "Please confirm",
      "Are you sure you want to delete this deck?",
      [

        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await deleteDeck(db, id);
            await loadDecks();
          }
        },
        {
          text: "Cancel",
          style: "cancel"
        },
      ])
  }

  return (
    <View style={styles.container}>

      {decks.length === 0 && (
        <Text style={styles.notifyText}>{"No decks yet — start by adding one!"}</Text>
      )}

      {/* List of decks */}
      <FlatList
        data={decks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View >
            <TouchableOpacity onPress={() => navigation.navigate("DeckScreen", { deck: item })}>
              <View style={styles.deck}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <View style={{ position: 'absolute', right: 5, top: 5 }}>
                  <OptionsButton
                    actions={[
                      { label: "Edit", onPress: () => setSelectedDeck(item) },
                      { label: "Delete", onPress: () => handleDeleteDeck(item.id) }
                    ]}
                  />
                </View>
              </View>

            </TouchableOpacity>

          </View>
        )}
      />
      {/* Component to add decks */}
      <AddDeck onDeckAdded={loadDecks} />

      {selectedDeck && (
        <EditDeck
          selectedDeck={selectedDeck}
          onDeckUpdated={() => {
            loadDecks();
            setSelectedDeck(null);
          }}
        />
      )}

    </View>
  );
}