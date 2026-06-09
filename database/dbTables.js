//Database tables
export const createDeckTable = `
  CREATE TABLE IF NOT EXISTS deck (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT
  );
`;

export const createCardTable = `
  CREATE TABLE IF NOT EXISTS card (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    deck_id INTEGER NOT NULL,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    FOREIGN KEY (deck_id) REFERENCES deck(id) ON DELETE CASCADE
  );
`;
export const createTestResultTable = `
  CREATE TABLE IF NOT EXISTS test_results(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  deck_id INTEGER NOT NULL,
  score INTEGER NOT NULL,
  FOREIGN KEY(deck_id) REFERENCES deck(id)
  );
`;