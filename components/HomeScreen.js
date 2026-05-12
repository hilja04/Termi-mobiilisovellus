import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert, FlatList, Modal, Text, TextInput, TouchableOpacity, View, } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { Button, Card } from 'react-native-paper';
import { deleteDeck, fetchDecks, saveDeck, } from '../database/dbFunctions';
import styles from './styles';
import AddDeck from './AddDeck';
export default function HomeScreen() {
  const db = useSQLiteContext(); //accessing the database
  const navigation = useNavigation();

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
    await saveDeck(db, title, description);
    await loadDecks();
    setTitle('');
    setDescription('');
    setShowModal(false);
  }

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
      {/* List of decks with temporary styling */}
      <FlatList
        data={decks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity onPress={() => navigation.navigate("DeckDetails", { deck: item })}>
              <View style={styles.deck}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.title}</Text>
                <Text>{item.description}</Text>
                <Button
                  style={styles.deleteButton}
                  mode="contained"
                  onPress={() => handleDeleteDeck(item.id)}
                >
                  Delete
                </Button>
              </View>
            </TouchableOpacity>
          </View>
        )}
      />
      <AddDeck onDeckAdded={loadDecks} />
  
    </View>
  );
}