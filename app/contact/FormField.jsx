"use client";
import React from "react";

const FormField = ({ name, value, onChange, type, placeholder }) => {
  if (name === "message") {
    return (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        className="border border-stone-400 rounded w-full h-60 py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-transparent focus:border-green-600 focus:shadow-[0_0_0_1px_rgba(72,187,120,1)] mb-4"
        placeholder={placeholder}
      />
    );
  }

  return (
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      className="border border-stone-400 rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-transparent focus:border-green-600 focus:shadow-[0_0_0_1px_rgba(72,187,120,1)] mb-4"
      placeholder={placeholder}
    />
  );
};

export default FormField;
