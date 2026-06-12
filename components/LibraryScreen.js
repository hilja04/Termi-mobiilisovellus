import { useSQLiteContext } from 'expo-sqlite';
import { useCallback, useEffect, useState, } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { FlatList,Text, View,  } from 'react-native';
import { Button, List } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { fetchDecks, fetchTestHistory } from '../database/dbFunctions';
import styles from './styles';

export default function LibraryScreen() {
  const db = useSQLiteContext(); // accessing the database

  const [decks, setDecks] = useState([]);
  const [expanded, setExpanded] = useState(null);

  //Gets deck and test results data
  const loadDecks = async () => {
    const baseDecks = await fetchDecks(db);
    
    for ( let deck of baseDecks){
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

  return (
    <View style={styles.container} >
      <FlatList
        data={decks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <List.Accordion
            title={item.title }
            titleStyle={{ color: "black", fontWeight: "bold" }}
            style={{ backgroundColor: "#b87fde", borderWidth: 0.5, }}
            description={item.description}
            left={props => <List.Icon {...props} icon="clipboard-list" />}
          >

            {item.history.length === 0 && (
              <List.Item title="No tests yet" />
            )}

            {item.history.map(test => (
              <List.Item
                key={test.id}
                title={`${test.score} / ${test.total} — ${test.mode}`}
                description={test.created_at}
                left={props => <List.Icon {...props} icon="clipboard-check" />}
              />
            ))}
            
          </List.Accordion>

        )}
      />
    </View>
  );
}