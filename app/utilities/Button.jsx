import React from "react";

function Button({
  children,
  onClick,
  width,
  height,
  bgcolor,
  hbgcolor,
  textColor,
  disabled,
}) {
  return (
    <button
      className={`w-full  my-2 rounded  text-center ${textColor} ${width} ${bgcolor} ${hbgcolor} ${height}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
