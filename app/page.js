"use client";

import { useState } from "react";
import InputNumbers from "./ui/InputNumbers";
import { Button } from "@/components/ui/button";
import { findNumbers } from "@/utils/findNumbers";

export default function Home() {
  const [allSelections, setAllSelections] = useState([]);
  const [category, setCaregory] = useState("");
  const [values, setValues] = useState({ columns: [], diagonals: [] });
  console.log('allSelections: ', allSelections);

  const handleSubmit = () => {
    const { diagonals, columns } = values;
    const results = findNumbers({ diagonals, columns });
    setAllSelections(results);
    setCaregory("sixDigitCombinations");
    console.log("results: ", results);
  };

  return (
    <main className="size-full p-4 flex flex-col items-center justify-center gap-2">
      <h1 className="text-3xl font-bold">תוכנת לוטו</h1>

      <div className="w-full h-96 max-md:flex-grow border p-4 flex max-md:flex-col items-center justify-center gap-4 overflow-hidden">
        <div /* INPUTS */
          className="size-full flex flex-col items-center justify-center gap-4"
        >
          <div className="size-full max-w-96 flex flex-col items-center justify-center gap-4">
            <InputNumbers
              label="מספרים לחישוב הטורים"
              isColumns
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
                setValues((prevValues) => ({ ...prevValues, diagonals: value }))
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
          <div className="w-full flex justify-center items-center gap-2">
            <Button onClick={() => setCaregory("sixDigitCombinations")}>
              כל המספרים
            </Button>
            <Button onClick={() => setCaregory("columnNumbers")}>
              רק הטורים
            </Button>
            <Button onClick={() => setCaregory("diagonalNumbers")}>
              רק האלכסונים
            </Button>
          </div>
          <h2>{`מספר התוצאות הוא ${allSelections[category]?.length || 0}`}</h2>
          <div dir="ltr" className="size-full flex flex-col items-center gap-2 overflow-auto">
            {allSelections[category]?.map((selection, index) => (
              <div
                key={index}
                className="w-full h-fit p-4 flex flex-col items-center justify-center gap-2 rounded-md bg-gray-100 text-gray-800"
              >
                {selection.join(" ")}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
