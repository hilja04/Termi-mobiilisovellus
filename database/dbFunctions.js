import { useSQLiteContext } from 'expo-sqlite';

//fetches all decks
export async function fetchDecks(db) {
    return db.getAllAsync('SELECT * FROM deck');
}

//Creates New Deck
export async function saveDeck(db, title, description) {
    return db.runAsync(
        'INSERT INTO deck (title,description) values (?,?)', [title, description]
    );
}
//Updates selected deck
export async function updateDeck(db,id,title,description){
    return db.runAsync(
        'UPDATE deck SET title = ?, description = ? WHERE id = ?',[title,description,id]
    );
}
//Deletes selected deck
export async function deleteDeck(db, id) {
    return db.runAsync(
        'DELETE FROM deck WHERE id = ?',
        [id]
    );
}
