"use client";

import { useState } from "react";
import { calculateNumbers } from "@/utils/calculator";
import InputNumbers from "./ui/InputNumbers";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [allSelections, setAllSelections] = useState([]);
  const [values, setValues] = useState({ columns: [], slants: [] });
  const [criterion, setCriterion] = useState("selectedNumbers");

  const handleSubmit = () => {
    const { slants, columns } = values;
    const result = calculateNumbers({ slants, columns });
    setAllSelections(result?.allPossibleSelections);
    console.log("result: ", result);
  };

  const renderSelection = (selection) => {
    const value = criterion.includes(".")
      ? criterion.split(".").reduce((obj, key) => obj[key], selection)
      : selection[criterion];
    return value.join(", ");
  };

  return (
    <main className="size-full p-4 flex flex-col items-center justify-center gap-2">
      <h1 className="text-3xl font-bold">תוכנת לוטו</h1>

      <div className="w-full h-96 max-md:flex-grow border p-4 flex max-md:flex-col items-center justify-center gap-4 overflow-hidden">
        <div /* INPUTS */ className="size-full flex flex-col items-center justify-center gap-4">
          <InputNumbers
            label="מספרים לחישוב הטורים"
            getValue={(value) =>
              setValues((prevValues) => ({
                ...prevValues,
                columns: value,
              }))
            }
          />
          <InputNumbers
            label="מספרים לחישוב האלכסונים"
            getValue={(value) =>
              setValues((prevValues) => ({ ...prevValues, slants: value }))
            }
          />
          <button
            className="size-fit w-full p-2 rounded-md bg-blue-700 text-white"
            onClick={handleSubmit}
          >
            בחר את כל המספרים
          </button>
        </div>

        <div /* RESULTS */ className="size-full flex flex-col items-center gap-2 overflow-hidden">
          <div className="w-full flex justify-center items-center gap-2">
            <Button onClick={() => setCriterion("selectedNumbers")}>
              כל המספרים
            </Button>
            <Button onClick={() => setCriterion("selectedByCriteria.digits")}>
              רק הטורים
            </Button>
            <Button onClick={() => setCriterion("selectedByCriteria.sums")}>
              רק האלכסונים
            </Button>
          </div>
          <div className="size-full flex flex-col items-center gap-2 overflow-auto">
            {allSelections.map((selection, index) => (
              <div
                key={index}
                className="w-full h-fit p-4 flex flex-col items-center justify-center gap-2 rounded-md bg-gray-100 text-gray-800"
              >
                {renderSelection(selection)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
