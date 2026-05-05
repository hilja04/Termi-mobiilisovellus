import { createDeckTable, createCardTable } from './dbTables';
//Database initializer
export async function initializeDatabase(db) {
    try {
        await db.execAsync(createDeckTable);
        await db.execAsync(createCardTable);

        console.log("Database initialized");
    } catch (error) {
        console.error("Database initialization failed:", error);
    }
}
