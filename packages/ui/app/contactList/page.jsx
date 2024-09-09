"use client";
import React, { useState, useEffect } from "react";
import Title from "../utilities/Title";
import Header from "../utilities/Header";
import Footer from "../utilities/Footer";

import ContactTable from "./ContactTable";

export default function ContactList() {
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/contact`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setContacts(data);
      })
      .catch((error) => {
        console.error("Error fetching contacts:", error);
      });
  }, []);
  return (
    <div>
      <Header />
      <main className="px-6 md:px-16 lg:px-24 xl:px-36 pt-10">
        <Title>Contact List</Title>
        <ContactTable contacts={contacts} />
      </main>
      <Footer />
    </div>
  );
}
