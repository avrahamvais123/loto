"use client";

// components/Dropdown.js

import React, { useState } from "react";

const Dropdown = ({ options, name, register }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block w-full">
      <div
        className="w-full px-3 py-2 border rounded-md cursor-pointer bg-white focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedOption.label}</span>
      </div>
      {isOpen && (
        <div className="absolute w-full mt-1 bg-white border rounded-md shadow-lg z-10">
          {options.map((option, idx) => (
            <div
              key={idx}
              className="px-3 py-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
      <input type="hidden" value={selectedOption.value} {...register(name)} />
    </div>
  );
};

export default Dropdown;
