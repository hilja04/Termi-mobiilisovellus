import { useSQLiteContext } from 'expo-sqlite';

//Create New Deck
export async function saveDeck(db,title,description){
    return db.runAsync(
        'INSERT INTO deck (title,description) values (?,?)', [title, description]
    );
}
//fetches decks
export async function fetchDecks(db){
    return db.getAllAsync('SELECT * FROM deck');

}
