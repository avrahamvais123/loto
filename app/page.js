"use client";

import { useState } from "react";
import CalculateInput from "./ui/CalculateInput";
import { findNumbers } from "@/utils/findNumbers";
import { IoMdSettings } from "react-icons/io";
import NumberInput from "./ui/NumberInput";
import Drawer from "./ui/Drawer";
import { cn } from "@/lib/utils";
import Button from "./ui/Button";
import axios from "axios";
import dayjs from "dayjs";

export default function Home() {
  const [allSelections, setAllSelections] = useState([]);
  const [category, setCaregory] = useState("");
  const [openDrawer, setOpenDrawer] = useState(false);
  const [values, setValues] = useState({ columns: [], diagonals: [] });
  const [recentResults, setRecentResults] = useState({});

  const date = new Date();

  const handleSubmit = () => {
    const results = findNumbers(values);
    setAllSelections(results);
    setCaregory("combinations");
    setOpenDrawer(false);
    console.log("results: ", results);
  };

  const getRecentResults = async () => {
    try {
      const res = await axios.get(
        "https://paisapi.azurewebsites.net/lotto/recent"
      );
      console.log("recent results: ", res.data);
      setRecentResults(res.data);
    } catch (error) {
      console.error("error: ", error);
    }
  };

  return (
    <>
      <main className="relative size-full border-0 border-blue-600 p-4 flex-grow overflow-auto flex flex-col items-center gap-2">
        <button
          className="absolute top-4 right-4 text-xl"
          onClick={() => setOpenDrawer(true)}
        >
          <IoMdSettings className="text-slate-400" />
        </button>
        <Drawer
          open={openDrawer}
          setOpen={setOpenDrawer}
          onClose={() => setOpenDrawer(false)}
        >
          <div className="text-xl text-slate-600 font-bold">אפשרויות</div>
          <div className="flex flex-col gap-4">
            <Button onClick={getRecentResults}>
              הצג תוצאות ההגרלה האחרונה
            </Button>

            {recentResults?.date && (
              <div className="size-full flex flex-col justify-center gap-2">
                <div className="w-full border p-2 px-4">
                  <h4 className="text-xl text-slate-600">תאריך:</h4>
                  <h4 className="text-xl text-slate-600 w-full flex items-center gap-4">
                    {dayjs(recentResults?.date).day()}/
                    {dayjs(recentResults?.date).month()}/
                    {dayjs(recentResults?.date).year()}
                  </h4>
                </div>

                <div className="w-full border p-2 px-4">
                  <h4 className="text-xl text-slate-600">המספרים הזוכים:</h4>
                  {recentResults?.winNumbers?.map((num, i) => {
                    return (
                      <span key={i} className="text-xl text-slate-600">
                        {num}{" "}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </Drawer>

        <div /* TITLE */
          className="w-full flex justify-center items-center gap-2"
        >
          <h1 className="text-3xl font-bold">תוכנת לוטו</h1>
        </div>

        <div /* INPUTS */
          className="size-full border-0 flex flex-col items-center justify-center gap-4"
        >
          <div className="size-full max-w-md flex flex-col justify-center items-center gap-4">
            <NumberInput
              label="מספר הספרות לחישוב"
              initialValue={0}
              min={0}
              onChange={(value) => {
                setValues((prevValues) => ({
                  ...prevValues,
                  comboLength: value,
                }));
              }}
            />
            <NumberInput
              label="מספר מקסימום"
              initialValue={36}
              min={0}
              onChange={(value) => {
                setValues((prevValues) => ({
                  ...prevValues,
                  maxNumber: value,
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
          className="size-full h-fit max-w-md border-0 flex flex-col items-center gap-2"
        >
          <h2 className="text-xl font-bold">{`מספר התוצאות הוא ${
            allSelections[category]?.length || 0
          }`}</h2>
          <div className="size-full flex flex-col items-center gap-2">
            {allSelections[category]?.map((selection, index) => (
              <div
                key={index}
                className="w-full h-fit p-4 flex justify-center items-center gap-4 rounded-md border border-gray-200 text-gray-800"
              >
                <p className="text-blue-600">{`${index + 1}.`}</p>
                <p className="w-full text-gray-700 text-center">
                  {selection.join(" ")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
