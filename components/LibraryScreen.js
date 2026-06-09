import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState, } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { View, Text, useWindowDimensions } from 'react-native';
import { List } from 'react-native-paper';
import styles from './styles';
import { fetchDecks } from '../database/dbFunctions';
import { FlatList } from 'react-native';

export default function LibraryScreen() {
  const db = useSQLiteContext(); // accessing the database

  const [decks, setDecks] = useState([]);
  const [expanded, setExpanded] = useState(null);

  const loadDecks = async () => {
    const fetched = await fetchDecks(db);
    setDecks(fetched);
  }

  useFocusEffect(
    useCallback(() => {
      loadDecks();
    }, [])
  );


  return (
    <View >
      <FlatList
        data={decks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (

          <List.Accordion
            title={item.title}
            description={item.description}
            left={props => <List.Icon {...props} icon="clipboard-list" />}>
            <List.Item title={`Cards: ${item.cardCount}`} />
            <List.Item title={`Plays: ${item.testCount}`} />
            <List.Item
              title={`Best Score: ${item.testCount > 0
                ? `${item.bestScore} / ${item.cardCount}`
                : "no results"
                }`}
            />
            <List.Item
              title={`Worst Score: ${item.testCount > 0
                ? `${item.worstScore} / ${item.cardCount}`
                : "no results"
                }`}
            />
            <List.Item
              title={`Average: ${item.testCount > 0
                ? `${(item.averageScore ?? 0).toFixed(2)} / ${item.cardCount}`
                : "no results"
                }`}
            />
          </List.Accordion>

        )}
      />


    </View>
  );
}