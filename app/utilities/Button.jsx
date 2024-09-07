import React from "react";

function Button({
  children,
  onClick,
  width,
  height,
  bgcolor,
  hbgcolor,
  textColor,
}) {
  return (
    <button
      className={`w-full text-white my-2 rounded  text-center ${textColor} ${width} ${bgcolor} ${hbgcolor} ${height}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
