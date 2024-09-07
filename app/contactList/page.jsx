"use client";
import React, { useState, useEffect } from "react";
import ContactTable from "./ContactTable";
import Title from "../utilities/Title";
import Header from "../utilities/Header";

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
    <div>
      <Header />
      <div className="px-6 md:px-16 lg:px-24 xl:px-36 py-3 ">
        <Title>Contact List</Title>
        <ContactTable contacts={contacts} />
      </div>
    </div>
  );
}
