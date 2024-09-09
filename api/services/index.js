const db = require("../database");

// create new contact
const createContact = ({ firstName, lastName, email, phone, message }) => {
  const sql = `INSERT INTO Contacts (firstName, lastName, email, phone, message)
               VALUES (?, ?, ?, ?, ?)`;

  return new Promise((resolve, reject) => {
    db.run(sql, [firstName, lastName, email, phone, message], function (err) {
      if (err) {
        return reject(new Error(err.message));
      }
      resolve({ id: this.lastID });
    });
  });
};

// get all contacts
const getContacts = async () => {
  const sql = `SELECT * FROM Contacts`;

  return new Promise((resolve, reject) => {
    db.all(sql, [], (err, rows) => {
      if (err) {
        return reject(new Error(err.message));
      }
      resolve(rows);
    });
  });
};

// verify contact
const verifyContact = async (id) => {
  const sql = `UPDATE Contacts SET verified = 1 WHERE id = ?`;

  return new Promise((resolve, reject) => {
    db.run(sql, [id], function (err) {
      if (err) {
        return reject(new Error(err.message));
      }
      resolve(this.changes > 0);
    });
  });
};

const deleteContact = async (id) => {
  const sql = `DELETE FROM Contacts WHERE id = ?`;

  return new Promise((resolve, reject) => {
    db.run(sql, [id], function (err) {
      if (err) {
        return reject(new Error(err.message));
      }
      resolve(this.changes > 0);
    });
  });
};

module.exports = { createContact, getContacts, verifyContact, deleteContact };
