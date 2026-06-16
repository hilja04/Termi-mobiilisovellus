import { useSQLiteContext } from 'expo-sqlite';
import { useCallback, useEffect, useState, } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { FlatList, Text, View, } from 'react-native';
import { Button, List, IconButton } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Alert } from 'react-native';
import { fetchDecks, fetchTestHistory, clearTestHistory } from '../database/dbFunctions';
import styles from './styles';

export default function LibraryScreen() {
  const db = useSQLiteContext(); // accessing the database

  const [decks, setDecks] = useState([]);
  const [expanded, setExpanded] = useState(null);

  //Gets deck and test results data
  const loadDecks = async () => {
    const baseDecks = await fetchDecks(db);

    for (let deck of baseDecks) {
      deck.history = await fetchTestHistory(db, deck.id)
    }
    setDecks(baseDecks)

  }

  //Päivittää tuloset joka kerta kun sivu on fokuksessa
  useFocusEffect(
    useCallback(() => {
      loadDecks();
    }, [])
  );

  const handleClearHistory = (deck_id) => {
    Alert.alert(
      "Clear history",
      "Are you sure you want to delete all test results for this deck?",
      [
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await clearTestHistory(db, deck_id);
            await loadDecks();
          }
        },
        { text: "Cancel", style: "cancel" }
      ]
    );
  }

  return (
    <View style={styles.container} >

      {decks.length === 0 && (
        <Text style={styles.notifyText}>{"No decks  — start by adding one!"}</Text>
      )}


      <FlatList
        data={decks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <List.Accordion
            title={item.title}
            titleStyle={{ color: "black", fontWeight: "bold" }}
            style={{ backgroundColor: "#e0e0e0", borderWidth: 0.5 }}
            description={item.description}
            left={props => <List.Icon {...props} icon="clipboard-list" />}
          >

            {item.history.length === 0 && (
              <List.Item title="No results yet" />
            )}

            {item.history.map(test => (
              <List.Item
                key={test.id}
                title={`${test.score} / ${test.total} — ${test.mode}`}
                description={test.created_at}
                left={props => <List.Icon {...props} icon="clipboard-check" />}
                titleStyle={{ fontSize: 15 }}
                descriptionStyle={{ fontSize: 13 }}
              />
            ))}

            {item.history.length > 0 && (
              <Text
                style={{
                  color: "#7a3cad",
                  textAlign: "right",
                  fontSize: 15,
                  marginBottom: 20,
                  marginRight: 20
                }}
                onPress={() => handleClearHistory(item.id)}
              >
                Clear history
              </Text>
            )}
          </List.Accordion>

        )}
      />
    </View>
  );
}