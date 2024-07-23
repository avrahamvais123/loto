"use client";

import { useState } from "react";
import CalculateInput from "./ui/CalculateInput";
import { findNumbers } from "@/utils/findNumbers";
import NumberInput from "./ui/NumberInput";

export default function Home() {
  const [allSelections, setAllSelections] = useState([]);
  const [category, setCaregory] = useState("");
  const [values, setValues] = useState({ columns: [], diagonals: [] });

  const handleSubmit = () => {
    const results = findNumbers(values);
    setAllSelections(results);
    setCaregory("combinations");
    console.log("results: ", results);
  };

  return (
    <>
      <main className="size-full p-4 flex flex-col items-center justify-center gap-2">
        <h1 className="text-3xl font-bold">תוכנת לוטו</h1>

        <div className="w-full h-96 max-md:flex-grow border p-4 flex max-md:flex-col items-center justify-center gap-4 overflow-hidden">
          <div /* INPUTS */
            className="size-full flex flex-col items-center justify-center gap-4"
          >
            <div className="size-full max-w-96 flex flex-col items-center justify-center gap-4">
              <NumberInput
                initialValue={0}
                min={0}
                onChange={(value) => {
                  setValues((prevValues) => ({
                    ...prevValues,
                    comboLength: value,
                  }));
                }}
              />
              <CalculateInput
                label="מספרים לחישוב הטורים"
                isColumns
                getValue={(value) =>
                  setValues((prevValues) => ({
                    ...prevValues,
                    columns: value,
                  }))
                }
              />
              <CalculateInput
                label="מספרים לחישוב האלכסונים"
                getValue={(value) =>
                  setValues((prevValues) => ({
                    ...prevValues,
                    diagonals: value,
                  }))
                }
              />
              <button
                className="size-fit w-full p-2 rounded-md bg-blue-700 text-white"
                onClick={handleSubmit}
              >
                בחר את כל המספרים
              </button>
            </div>
          </div>

          <div /* RESULTS */
            className="size-full flex flex-col items-center gap-2 overflow-hidden"
          >
            <h2 className="text-xl font-bold">{`מספר התוצאות הוא ${
              allSelections[category]?.length || 0
            }`}</h2>
            <div className="size-full flex flex-col items-center gap-2 overflow-auto">
              {allSelections[category]?.map((selection, index) => (
                <div
                  key={index}
                  className="w-full h-fit p-4 flex justify-center items-center gap-4 rounded-md border border-gray-200 text-gray-800"
                >
                  <p className="text-gray-300">{`${index + 1}.`}</p>
                  <p className="w-full text-gray-700 text-center">
                    {selection.join(" ")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
