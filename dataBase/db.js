const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./dataBase/auction.db");

// Create users and auction table
db.serialize(() => {
  db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        )
    `);
  db.run(`
        CREATE TABLE IF NOT EXISTS auction (
            productID INTEGER PRIMARY KEY AUTOINCREMENT,
            productName TEXT NOT NULL,
            quantity REAL NOT NULL,
            pricePerUnit REAL NOT NULL,
            productCategory TEXT NOT NULL,
            productDescription TEXT NOT NULL,
            stripePriceID TEXT NOT NULL,
            createdAt TEXT DEFAULT CURRENT_TIMESTAMP
        )
    `);
});

module.exports = db;
