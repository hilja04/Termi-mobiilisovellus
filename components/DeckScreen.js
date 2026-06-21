import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FlatList, View, Text, TouchableOpacity, Alert } from 'react-native'
import { Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { fetchCards, deleteCard } from '../database/dbFunctions';
import AddCard from './AddCard';
import OptionsButton from './OptionsButton';
import styles from './styles';

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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <OptionsButton
          variant="dark"
          color="white"
          actions={[
            { label: "FlashCards", onPress: () => navigation.navigate("FlashCards", { deck }) },
            { label: "Multiple Choice", onPress: () => navigation.navigate("MultipleChoice", { deck }) },
            { label: "Written Exam", onPress: () => navigation.navigate("WritingScreen", { deck }) },
          ]}
        />
      )
    });
  }, [navigation, deck]);

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

  //Function to turn cards
  const toggleCards = (index) => {
    const updatedCards = [...cards]; // makes a copy of cards
    updatedCards[index].showAnswer = !updatedCards[index].showAnswer; // toggles showAnswer between true and false 
    setCards(updatedCards);
  };

  return (
    <View style={styles.container}>
      
      {cards.length > 0 && (
        <Text style={styles.deckDescription}> {deck.description}</Text>
      )}

      {cards.length === 0 && (
        <Text style={styles.notifyText}>{"No cards yet — add one!"}</Text>
      )}

      {/* List of cards */}
      <FlatList
        data={cards}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (

          <TouchableOpacity onPress={() => toggleCards(index)}>

            <LinearGradient
              colors={['#f3e4fe', '#c176e7', '#7a3cad']}
              start={{ x: 1.1, y: 1 }}
              end={{ x: 0, y: 0 }}
              style={styles.deck}
            >
              <Text style={styles.cardTitle}>
                {item.showAnswer ? item.answer : item.question}
              </Text>

              <View style={{ position: 'absolute', right: 5, top: 5 }}>
                <OptionsButton
                  variant='light'
                  actions={[
                    { label: "Delete", onPress: () => handleDeleteCard(item.id) }
                  ]}
                />
              </View>
            </LinearGradient>
          </TouchableOpacity>

        )}
      />
      {/* Component to add decks */}
      <AddCard onCardAdded={loadCards} deck_id={deck.id} />
    </View>
  );
}