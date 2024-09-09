"use client";
import React, { useState } from "react";
import Button from "../utilities/Button";

function ContactRowContent({ children, width }) {
  return (
    <td
      className={`text-center text-sm md:text-base lg:text-lg  px-4 w-48 break-all py-2 align-middle box-border min-w-[150px] max-w-[300px] truncate"${width} `}
    >
      {children}
    </td>
  );
}
function ContactRow({ contact, isLast, onDelete }) {
  const [isVerified, setIsVerified] = useState(contact.verified);

  // handle verification
  const handleVerify = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/contact/${contact.id}/verify`,
        {
          method: "PUT",
        }
      );
      if (response.ok) {
        setIsVerified(true);
      } else {
        console.error("Failed to verify contact");
      }
    } catch (error) {
      console.error("Error verifying contact:", error);
    }
  };

  // handle delete
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/contact/${contact.id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        onDelete(contact.id);
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };
  return (
    <tr
      className={`bg-white ${
        isLast ? "border-b border-gray-400" : "border-b border-gray-200"
      }`}
    >
      <ContactRowContent>{contact.firstName}</ContactRowContent>
      <ContactRowContent>{contact.lastName}</ContactRowContent>
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
          <Button
            width="w-48"
            height="py-1"
            onClick={handleVerify}
            hbgcolor={isVerified ? "" : "hover:bg-green-700"}
            bgcolor={isVerified ? "bg-gray-200" : "bg-green-600"}
            disabled={isVerified}
            textColor={isVerified ? "text-black" : "text-white"}
          >
            {isVerified ? "Verified" : "Verify"}
          </Button>
          <Button
            width="w-44"
            textColor="text-white"
            bgcolor="bg-red-600"
            hbgcolor="hover:bg-red-700"
            height="py-1"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </td>
    </tr>
  );
}

export default ContactRow;
