import React from "react";

function SubmitButton({ children }) {
  return (
    <div className="w-full bg-green-600 text-white py-4 rounded hover:bg-green-700 text-center mb-1">
      {children}
    </div>
  );
}

export default SubmitButton;
