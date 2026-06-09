import { createDeckTable, createCardTable, createTestResultTable } from './dbTables';
//Database initializer
export async function initializeDatabase(db) {
    try {
        await db.execAsync(createDeckTable);
        await db.execAsync(createCardTable);
        await db.execAsync(createTestResultTable)
        console.log("Database initialized");
    } catch (error) {
        console.error("Database initialization failed:", error);
    }
}
