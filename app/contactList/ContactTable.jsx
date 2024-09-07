"use client";
import ContactRow from "./ContactRow";
import ContactTitle from "./ContactTitle";

export default function ContactTable({ contacts }) {
  return (
    <table className="min-w-full bg-gray-100 border table-fixed w-full border-collapse  ">
      <thead className="border border-stone-400 border-spacing-0">
        <ContactTitle />
      </thead>
      <tbody className="border border-stone-400 ">
        {contacts.map((contact, index) => (
          <ContactRow
            key={contact.id}
            contact={contact}
            isLast={index === contacts.length - 1}
          />
        ))}
      </tbody>
    </table>
  );
}
