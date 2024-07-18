"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";

const InputNumbers = ({ getValue = () => {}, ...props }) => {
  const [inputValue, setInputValue] = useState("");
  const [numbersArray, setNumbersArray] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;

    // Remove spaces and split by comma
    const numbers = value
      .replace(/\s+/g, "")
      .split(",")
      .map(Number)
      .filter((num) => !isNaN(num) && num >= 1 && num <= 6);

    // Remove duplicates
    const uniqueNumbers = [...new Set(numbers)];

    // Update state only if the numbers array length is less than or equal to 6
    if (uniqueNumbers.length <= 6) {
      setInputValue(value);
      setNumbersArray(uniqueNumbers);
      getValue(uniqueNumbers);
    }
  };

  const handleKeyDown = (e) => {
    const key = e.key;

    // Check if key is a number between 1 and 6
    if (!isNaN(key) && (key < 1 || key > 6)) {
      e.preventDefault();
    }

    // Check if the number is already in the array
    if (numbersArray.includes(Number(key))) {
      e.preventDefault();
    }

    // Check if all possible numbers are already included
    const uniqueNumbers = [...new Set(numbersArray)];
    if (
      uniqueNumbers.length >= 6 &&
      e.key !== "Backspace" &&
      e.key !== "Delete"
    ) {
      e.preventDefault();
    }
  };

  return (
    <div className={cn("w-full flex flex-col", props?.wrapperClassName)}>
      <label
        htmlFor="input-numbers"
        className={cn("text-gray-600 text-sm", props?.labelClassName)}
      >
        {props?.label}
      </label>
      <input
        {...props}
        id="input-numbers"
        type="text"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className={cn(
          "border border-gray-500 py-2 px-4 rounded-md w-full",
          props?.className
        )}
      />
      <p className="text-xs text-gray-400">יש להכניס מספרים מ-1 עד 6 מופרדים בפסיק</p>
    </div>
  );
};

export default InputNumbers;
