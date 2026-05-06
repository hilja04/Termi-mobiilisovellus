import { useSQLiteContext } from 'expo-sqlite';

//fetches all decks
export async function fetchDecks(db) {
    return db.getAllAsync('SELECT * FROM deck');
}

//Create New Deck
export async function saveDeck(db, title, description) {
    return db.runAsync(
        'INSERT INTO deck (title,description) values (?,?)', [title, description]
    );
}
//Deletes selected deck
export async function deleteDeck(db, id) {
    return db.runAsync(
        'DELETE FROM deck WHERE id = ?',
        [id]
    );
}
