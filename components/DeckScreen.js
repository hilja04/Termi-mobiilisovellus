import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { FlatList, View, Text, } from 'react-native'
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

  return (
    <View style={styles.container}>
      {/* List of decks */}
      <FlatList
        data={cards}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>

            <View style={styles.deck}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.answer}</Text>
              <Text>{item.question}</Text>
            </View>

          </View>
        )}
      />
      {/* Component to add decks */}
      <AddCard onCardAdded={loadCards} deck_id={deck.id} />

    </View>


  );
}