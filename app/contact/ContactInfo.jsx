import React from "react";

export default function ContactInfo({ title, children }) {
  return (
    <div className="mb-4">
      <h3 className="text-base font-bold mb-6 underline underline-offset-2">
        {title}
      </h3>
      {children}
    </div>
  );
}
