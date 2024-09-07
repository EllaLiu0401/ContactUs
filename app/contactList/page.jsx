"use client";
import ContactTable from "./ContactTable";
import React, { useState, useEffect } from "react";

export default function ContactList() {
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:9000/contacts")
      .then((response) => response.json())
      .then((data) => {
        setContacts(data.data);
      })
      .catch((error) => {
        console.error("Error fetching contacts:", error);
      });
  }, []);
  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-36 py-6 ">
      <h1 className="text-4xl text-left font-bold py-6">Contact List</h1>
      <ContactTable contacts={contacts} />
    </div>
  );
}
