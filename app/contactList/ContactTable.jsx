"use client";
import ContactRow from "./ContactRow";
import ContactTitle from "./ContactTitle";
import React, { useState, useEffect } from "react";

export default function ContactTable({ contacts }) {
  const [contactList, setContactList] = useState([]);

  useEffect(() => {
    setContactList(contacts);
  }, [contacts]);

  // filter contact list after deletion
  const handleDelete = (id) => {
    setContactList(contactList.filter((contact) => contact.id !== id));
  };

  return (
    <table className="min-w-full bg-gray-100 border table-fixed w-full border-collapse  ">
      <thead className="border border-stone-400 border-spacing-0">
        <ContactTitle />
      </thead>
      <tbody className="border border-stone-400 ">
        {contactList.map((contact, index) => (
          <ContactRow
            key={contact.id}
            contact={contact}
            isLast={index === contacts.length - 1}
            onDelete={handleDelete}
          />
        ))}
      </tbody>
    </table>
  );
}
