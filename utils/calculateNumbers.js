export function calculateNumbers(allowedDigits) {
  const maxNumber = 36;
  let results = [];

  // שלב 1: יצירת רשימת המספרים המתאימים לכל ספרת אחדות
  let possibleNumbers = {};
  for (let digit of allowedDigits) {
    possibleNumbers[digit] = [];
    for (let i = 1; i <= maxNumber; i++) {
      if (i % 10 === digit) {
        possibleNumbers[digit].push(i);
      }
    }
  }

  // שלב 2: יצירת כל השילובים האפשריים של המספרים
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

  // קריאה לפונקציה עם כל הרשימות של המספרים
  let values = Object.values(possibleNumbers);
  combine(values);

  return results;
}
