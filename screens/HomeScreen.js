import { useState, useEffect } from 'react';
import { View, Text, Modal, TextInput, FlatList } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { Button } from 'react-native-paper';
import { saveDeck, fetchDecks } from '../database/dbFunctions';

export default function HomeScreen() {
  const db = useSQLiteContext(); //accessing the database

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [decks, setDecks] = useState([]);

  const loadDecks = async () => {
    const fetched = await fetchDecks(db)
    setDecks(fetched)
  }

  useEffect(() => {
    loadDecks();
  }, []);

  const handleSaveDeck = async () => {
    await saveDeck(db, title, description)
    await loadDecks();
    setTitle('');
    setDescription('');
    setShowModal(false);
  }

  return (
    <View >
      <Button mode='contained' onPress={() => setShowModal(true)}>
        Add Deck
      </Button>

      <Modal
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View>
          <Text>Create a new deck</Text>
          <TextInput
            placeholder="Title"
            value={title}
            onChangeText={setTitle}

          />
          <TextInput
            placeholder="Description"
            value={description}
            onChangeText={setDescription}

          />
          <View>
            <Button mode="contained" onPress={handleSaveDeck}>
              Save Deck
            </Button>

            <Button mode="contained" onPress={() => setShowModal(false)}>
              Cancel
            </Button>
          </View>
        </View>

      </Modal>
      {/* List of decks with temporary styling */}
      <FlatList
        data={decks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.title}</Text>
            <Text>{item.description}</Text>
          </View>
        )}
      />
    </View>

  );
}