import { useSQLiteContext } from 'expo-sqlite';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { FlatList, View, Text, TouchableOpacity, Alert } from 'react-native'
import { Button } from 'react-native-paper';
import { fetchCards, deleteCard } from '../database/dbFunctions';
import styles from './styles';
import AddCard from './AddCard';
import FlashCardScreen from './FlashcardScreen';

export default function DeckScreen({ route }) {
  const { deck } = route.params;
  const db = useSQLiteContext(); //accessing the database
  const navigation = useNavigation();

  const [cards, setCards] = useState([]);

  const loadCards = async () => {
    const fetched = await fetchCards(db, deck.id);
    setCards(fetched);
  }
  useEffect(() => {
    loadCards();
  }, [])

  const handleDeleteCard = async (id) => {
    Alert.alert(
      "Please confirm",
      "Are you sure you want to delete this card?",
      [
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await deleteCard(db, id);
            await loadCards();
          }
        },
        {
          text: "Cancel",
          style: "cancel"
        },
      ])
  }

  //function to turn cards
  const toggleCards = (index) => {
    const updatedCards = [...cards]; // makes a copy of cards
    updatedCards[index].showAnswer = !updatedCards[index].showAnswer; // toggles showAnswer between true and false 
    setCards(updatedCards);
  };

  return (
    <View style={styles.container}>

      <Text style={styles.deckDescription}> {deck.description}</Text>

      {cards.length > 0 && (
        <Button style={[styles.defaultButton, { alignSelf: 'center', marginBottom: 10 }]} onPress={() => navigation.navigate("FlashCards", { deck })}>
          FlashCards
        </Button>
      )}

      {cards.length === 0 && (
        <Text style={styles.notifyText}>{"No cards yet — add one!"}</Text>
      )}

      {/* List of cards */}
      <FlatList
        data={cards}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (

          <TouchableOpacity onPress={() => toggleCards(index)} style={styles.deck}>
            <Text style={styles.cardTitle}>
              {item.showAnswer ? item.answer : item.question}
            </Text>
            <Button
              style={styles.deleteButton}
              mode="contained"
              onPress={() => handleDeleteCard(item.id)}
            >
              Delete
            </Button>
          </TouchableOpacity>
        )}
      />
      {/* Component to add decks */}
      <AddCard onCardAdded={loadCards} deck_id={deck.id} />

    </View>


  );
}