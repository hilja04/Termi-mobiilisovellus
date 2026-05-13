import { useSQLiteContext } from 'expo-sqlite';

//fetches all decks
export async function fetchDecks(db) {
    return db.getAllAsync('SELECT * FROM deck');
}

//Creates New Deck
export async function saveDeck(db, title, description) {
    return db.runAsync(
        'INSERT INTO deck (title,description) VALUES (?,?)', [title, description]
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
//Fecthes all cards
export async function fetchCards(db,deck_id) {
    return db.getAllAsync('SELECT * FROM card WHERE deck_id = ?',[deck_id]);
}
//Adds a card to a deck
export async function saveCard(db, deck_id, question, answer) {
    return db.runAsync(
        'INSERT INTO card (deck_id, question, answer) VALUES (?,?,?)', [deck_id, question, answer]
    );
}
//Deletes selected card
export async function deleteCard(db, id) {
    return db.runAsync(
        'DELETE FROM card WHERE id = ?',
        [id]
    );
}