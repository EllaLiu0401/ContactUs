const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
const port = 9000;

app.options("/contact", cors());
// CORS for react app
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST",
    credentials: true,
  })
);

app.use(express.json());

// connect to database
const db = new sqlite3.Database("./contacts.db");

// create new contact
app.post("/contacts", (req, res) => {
  const { first_name, last_name, email, phone, message } = req.body;

  if (!first_name || !last_name || !email || !phone || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  db.run(
    `INSERT INTO Contacts (first_name, last_name, email, phone, message)
     VALUES (?, ?, ?, ?, ?)`,
    [first_name, last_name, email, phone, message],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: this.lastID });
    }
  );
});

// get all contacts
app.get("/contacts", (req, res) => {
  const sql = "SELECT * FROM Contacts";
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({
      data: rows,
    });
  });
});

// mark contact as verified with specific id
app.put("/contacts/:id/verify", (req, res) => {
  const { id } = req.params;

  const sql = `UPDATE Contacts SET verified = 1, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;

  db.run(sql, [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: "Contact not found" });
    }
    res.json({ message: "Contact marked as verified" });
  });
});

// delete contact with specific id
app.delete("/contacts/:id", (req, res) => {
  const { id } = req.params;

  const sql = `DELETE FROM Contacts WHERE id = ?`;

  db.run(sql, [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: "Contact not found" });
    }
    res.json({ message: "Contact deleted successfully" });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
