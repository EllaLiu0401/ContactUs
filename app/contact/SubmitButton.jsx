import React from "react";

function SubmitButton({ children, onClick }) {
  return (
    <button
      className="w-full bg-green-600 text-white py-4 rounded hover:bg-green-700 text-center mb-1"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default SubmitButton;
