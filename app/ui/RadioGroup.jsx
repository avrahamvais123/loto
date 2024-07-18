// app/ui/RadioGroup.jsx

"use client";

import React from "react";
import { useController } from "react-hook-form";

const RadioGroup = ({ name = "", options, control }) => {
  const {
    field: { onChange, value },
  } = useController({ name, control });

  return (
    <div className="space-y-2">
      {options.map((option) => (
        <label key={option.value} className="flex items-center space-x-2">
          <input
            type="radio"
            value={option.value}
            checked={value === option.value}
            onChange={onChange}
            className="form-radio text-blue-600 h-4 w-4"
          />
          <span className="text-gray-700">{option.label}</span>
        </label>
      ))}
    </div>
  );
};

export default RadioGroup;
