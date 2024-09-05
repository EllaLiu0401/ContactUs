const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./contacts.db");

db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS Contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      message TEXT NOT NULL,
      verified INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    (err) => {
      if (err) {
        console.error("Error creating Contacts table", err);
      } else {
        console.log("Contacts table created successfully");
      }
    }
  );
});

db.close((err) => {
  if (err) {
    console.error("Error closing the database", err);
  } else {
    console.log("Database connection closed");
  }
});
