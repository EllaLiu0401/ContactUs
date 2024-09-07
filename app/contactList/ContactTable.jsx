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
    <div className="overflow-x-auto mt-8">
      <table className="min-w-full bg-gray-100 border table-auto w-full border-collapse  ">
        <thead className="border border-stone-400 border-spacing-0">
          <ContactTitle py="py-6" />
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
    </div>
  );
}
