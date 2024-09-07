import React from "react";

function Button({ children, onClick, width, height, bgcolor, hbgcolor = "" }) {
  return (
    <button
      className={`w-full bg-green-600 text-white my-2 rounded hover:bg-green-700 text-center  ${width} ${bgcolor} ${hbgcolor} ${height}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
