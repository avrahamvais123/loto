"use client";

import React, { useState } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const NumberInput = ({
  initialValue = 0,
  onChange,
  placeholder,
  maxWidth,
  min = -Infinity,
  max = Infinity,
}) => {
  const [value, setValue] = useState(initialValue);

  const increment = () => {
    if (value + 1 <= max) {
      const newValue = value + 1;
      setValue(newValue);
      onChange(newValue);
    } else return;
  };

  const decrement = () => {
    if (value - 1 >= min) {
      const newValue = value - 1;
      setValue(newValue);
      onChange(newValue);
    } else return;
  };

  const handleChange = (e) => {
    const newValue = Number(e.target.value);
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div
      style={{ maxWidth: maxWidth }}
      className={cn(
        "w-full max-w-48",
        "flex flex-col justify-center items-center",
      )}
    >
        <label className="w-full text-sm text-gray-400">מספר הספרות לחישוב</label>
      <div
        className={cn(
          "size-full",
          "flex justify-center items-center",
          "border rounded-md"
        )}
      >
        <button
          type="button"
          onClick={increment}
          className="h-full px-4 py-2 w-auto aspect-square text-xl rounded-r-md hover:bg-gray-100 focus:outline-none"
        >
          +
        </button>
        <input
          type="number"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full text-xl text-center px-4 border-0 border-x ring-0 outline-0"
        />
        <button
          type="button"
          onClick={decrement}
          className="h-full w-auto px-4 py-2 aspect-square text-xl rounded-l-md hover:bg-gray-100 focus:outline-none"
        >
          -
        </button>
      </div>
    </div>
  );
};

export default NumberInput;
