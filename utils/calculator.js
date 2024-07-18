//* הסבר */
//* columns - זה הטורים
//* slants - זה האלכסונים

// פונקציה לבחירת מספרים רנדומליים מהמערך
function getRandomNumbers(array, count) {
  let result = [];
  let clonedArray = [...array];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * clonedArray.length);
    result.push(clonedArray[randomIndex]);
    clonedArray.splice(randomIndex, 1);
  }
  return result;
}

export function calculateNumbers({ columns, slants }) {
  const maxNumber = 36;
  let results = [];

  let possibleNumbersByDigits = {};
  let possibleNumbersBySums = [];

  // יצירת רשימת המספרים המתאימים לכל ספרת אחדות
  if (columns && columns.length > 0) {
    for (let digit of columns) {
      possibleNumbersByDigits[digit] = [];
      for (let i = 1; i <= maxNumber; i++) {
        if (i % 10 === digit) {
          possibleNumbersByDigits[digit].push(i);
        }
      }
    }
  }

  // יצירת רשימת המספרים המתאימים לכל סכום ספרות
  if (slants && slants.length > 0) {
    let numbers = Array.from({ length: maxNumber }, (_, i) => i + 1);

    possibleNumbersBySums = slants.map((targetSum) =>
      numbers.filter((num) => {
        const sumOfDigits = num
          .toString()
          .split("")
          .reduce((acc, digit) => acc + parseInt(digit), 0);
        return sumOfDigits === targetSum;
      })
    );
  }

  // פונקציה ליצירת כל השילובים האפשריים של המספרים
  function combine(arr, prefix = []) {
    if (arr.length === 0) {
      results.push(prefix);
      return;
    }
    let first = arr[0];
    let rest = arr.slice(1);
    for (let value of first) {
      combine(rest, [...prefix, value]);
    }
  }

  let numbers = Array.from({ length: maxNumber }, (_, i) => i + 1);
  let resultsByColumns = [];
  let resultsBySlants = [];
  let allPossibleSelections = [];

  // טיפול במספרים לפי ספרת אחדות
  if (columns && columns.length > 0) {
    let valuesByDigits = Object.values(possibleNumbersByDigits);
    combine(valuesByDigits);
    resultsByColumns = results;
    results = [];
  }

  // טיפול במספרים לפי סכום ספרות
  if (slants && slants.length > 0) {
    let valuesBySums = possibleNumbersBySums;
    combine(valuesBySums);
    resultsBySlants = results;
    results = [];
  }

  // שילוב התוצאות מכל הקריטריונים
  if (resultsByColumns.length > 0 && resultsBySlants.length > 0) {
    resultsByColumns.forEach((digitsCombination) => {
      resultsBySlants.forEach((sumsCombination) => {
        let combined = [...digitsCombination, ...sumsCombination];
        if (combined.length <= 6) {
          allPossibleSelections.push({
            selectedNumbers: combined,
            selectedByCriteria: {
              digits: digitsCombination,
              sums: sumsCombination,
            },
            randomNumbers: [],
          });
        }
      });
    });
  } else if (resultsByColumns.length > 0) {
    resultsByColumns.forEach((digitsCombination) => {
      allPossibleSelections.push({
        selectedNumbers: digitsCombination,
        selectedByCriteria: {
          digits: digitsCombination,
          sums: [],
        },
        randomNumbers: [],
      });
    });
  } else if (resultsBySlants.length > 0) {
    resultsBySlants.forEach((sumsCombination) => {
      allPossibleSelections.push({
        selectedNumbers: sumsCombination,
        selectedByCriteria: {
          digits: [],
          sums: sumsCombination,
        },
        randomNumbers: [],
      });
    });
  }

  // הוספת מספרים רנדומליים אם האורך אינו מגיע ל-6
  allPossibleSelections = allPossibleSelections.map((selection) => {
    let remainingCount = 6 - selection.selectedNumbers.length;
    let randomNumbers = getRandomNumbers(
      numbers.filter((num) => !selection.selectedNumbers.includes(num)),
      remainingCount
    );
    selection.selectedNumbers = [
      ...selection.selectedNumbers,
      ...randomNumbers,
    ];
    selection.randomNumbers = randomNumbers;
    return selection;
  });

  return {
    slants,
    columns,
    resultsBySlants,
    resultsByColumns,
    allPossibleSelections,
  };
}

// פונקציה ליצירת כל השילובים האפשריים
/* function getAllCombinations(array, count) {
  if (count === 0) return [[]];
  if (array.length === 0) return [];

  const [first, ...rest] = array;
  const withoutFirst = getAllCombinations(rest, count);
  const withFirst = getAllCombinations(rest, count - 1).map((combination) => [
    first,
    ...combination,
  ]);

  return [...withoutFirst, ...withFirst];
} */
