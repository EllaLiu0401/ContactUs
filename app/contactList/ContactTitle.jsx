import React from "react";

function ContactTitle({ children, width }) {
  return (
    <th
      className={`text-base font-bold mb-6  text-center py-2  whitespace-nowrap ${width} border-stone-400`}
    >
      {children}
    </th>
  );
}
export default function ContactTitles() {
  return (
    <tr>
      <ContactTitle width="w-1/6">First Name</ContactTitle>
      <ContactTitle width="w-1/6">Last Name</ContactTitle>
      <ContactTitle width="w-1/3">Email</ContactTitle>
      <ContactTitle width="w-1/6">Phone Number</ContactTitle>
      <ContactTitle width="w-1/3">Note</ContactTitle>
      <ContactTitle width="w-1/6">Date</ContactTitle>
      <ContactTitle width="w-1/4">Option</ContactTitle>
    </tr>
  );
}
