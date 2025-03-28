import React from "react";

const Button = ({
  h = "6",
  w = "16",
  col = "bg-indigo-600",
  hcol = "bg-indigo-700",
  text = "text-white-600",
}) => {
  return (
    <div
      className={`h-${h} w-${w} ${col} py-3 rounded-md hover:${hcol} flex justify-between items-center ${text} border border-[1px] border-[black]`}
    >
      <button className={`h-6 w-4 ${col}  hover:${hcol} ${text}`}>{"-"}</button>
      <span>{0}</span>
      <button className={`h-6 w-4 ${col}  hover:${hcol} ${text}`}>{"+"}</button>
    </div>
  );
};

export default Button;
