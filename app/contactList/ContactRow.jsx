"use client";
import React from "react";
import Button from "../utilities/Button";

function ContactRowContent({ children, width }) {
  return (
    <td
      className={`text-center  px-4 w-48 break-all py-2 align-middle box-border ${width} `}
    >
      {children}
    </td>
  );
}
function ContactRow({ contact, isLast }) {
  return (
    <tr
      className={`bg-white ${
        isLast ? "border-b border-gray-400" : "border-b border-gray-200"
      }`}
    >
      <ContactRowContent>{contact.first_name}</ContactRowContent>
      <ContactRowContent>{contact.last_name}</ContactRowContent>
      <ContactRowContent>{contact.email}</ContactRowContent>
      <ContactRowContent>{contact.phone}</ContactRowContent>
      <ContactRowContent width="w-96">{contact.message}</ContactRowContent>
      <ContactRowContent width="w-96">{contact.created_at}</ContactRowContent>
      <td
        className={`text-center ${
          isLast ? "border-b border-gray-400" : "border-b border-gray-200"
        } px-8  align-middle `}
      >
        <div className="flex justify-center items-center gap-2">
          <Button width="w-36" height="py-1">
            {" "}
            Verify
          </Button>
          <Button
            width="w-36"
            bgcolor="bg-red-600"
            hbgcolor="hover:bg-red-700"
            height="py-1"
          >
            Delete
          </Button>
        </div>
      </td>
    </tr>
  );
}

export default ContactRow;
