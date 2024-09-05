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
app.post("/contact", (req, res) => {
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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
