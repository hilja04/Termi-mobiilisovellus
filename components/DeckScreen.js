import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { FlatList, View, Text, TouchableOpacity } from 'react-native'
import { fetchCards } from '../database/dbFunctions';
import styles from './styles';
import AddCard from './AddCard';

export default function DeckScreen({ route }) {
  const { deck } = route.params;
  const db = useSQLiteContext();

  const [cards, setCards] = useState([]);

  const loadCards = async () => {
    const fetched = await fetchCards(db, deck.id);
    setCards(fetched);
  }
  useEffect(() => {
    loadCards();
  }, [])

  //function to turn cards
  const toggleCards = (index) => {
    const updatedCards = [...cards]; // makes a copy of cards
    updatedCards[index].showAnswer = !updatedCards[index].showAnswer; // toggles showAnswer between true and false to turn the cards
    setCards(updatedCards);
  };

  return (
    <View style={styles.container}>

      <Text style={styles.deckDescription}> {deck.description}</Text>

      {cards.length === 0 && (
        <Text style={styles.notifyText}>{"No cards yet — add one!"}</Text>
      )}
      {/* List of decks */}

      <FlatList
        data={cards}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (


          <TouchableOpacity onPress={() => toggleCards(index)} style={styles.deck}>
            <Text style={styles.cardTitle}>
              {item.showAnswer ? item.answer : item.question}
            </Text>
          </TouchableOpacity>
        )}
      />
      {/* Component to add decks */}
      <AddCard onCardAdded={loadCards} deck_id={deck.id} />

    </View>


  );
}