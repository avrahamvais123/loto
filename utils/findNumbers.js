export function findNumbers({ diagonals, columns }) {
    // פונקציה עזר לבדוק אם סכום ספרות של מספר שווה לאחד המספרים במערך
    function sumOfDigitsEquals(number, value) {
      let sum = Math.floor(number / 10) + (number % 10);
      // אם הסכום גדול מ-9, נחבר את הספרות של הסכום שוב
      if (sum > 9) {
        sum = Math.floor(sum / 10) + (sum % 10);
      }
      return sum === value;
    }
  
    // פונקציה עזר לבדוק אם ספרת האחדות של מספר שווה לאחד המספרים במערך
    function unitsDigitEquals(number, value) {
      let unitsDigit = number % 10;
      // אם ספרת האחדות גדולה מ-9, נחבר את הספרות שוב
      if (unitsDigit > 9) {
        unitsDigit = Math.floor(unitsDigit / 10) + (unitsDigit % 10);
      }
      return unitsDigit === value;
    }
  
    // פונקציה ליצירת כל הצירופים האפשריים של k מספרים ממערך נתון
    function getCombinations(array, k) {
      const results = [];
  
      function helper(start, combo) {
        if (combo.length === k) {
          results.push([...combo]);
          return;
        }
  
        for (let i = start; i < array.length; i++) {
          combo.push(array[i]);
          helper(i + 1, combo);
          combo.pop();
        }
      }
  
      helper(0, []);
      return results;
    }
  
    // פונקציה לבדוק אם צירוף מכיל לפחות מספר אחד מכל אחד ממערכי הטורים והאלכסונים
    function containsAtLeastOneFromEach(combo, arrays) {
      return arrays.every(array => array.some(num => combo.includes(num)));
    }
  
    // פונקציה לבדוק אם צירוף לא מכיל יותר משני מספרים מכל אחד ממערכי הטורים והאלכסונים
    function containsAtMostTwoFromEach(combo, arrays) {
      return arrays.every(array => {
        const count = combo.filter(num => array.includes(num)).length;
        return count <= 2;
      });
    }
  
    // מערכים לאחסון התוצאות
    const diagonalNumbers = [];
    const columnNumbers = [];
    const commonNumbers = [];
  
    // חישוב המספרים שמתאימים לכל אחד מהערכים ב"אלכסונים"
    diagonals.forEach((diagonal) => {
      const diagonalArray = [];
      for (let i = 1; i <= 36; i++) {
        if (sumOfDigitsEquals(i, diagonal)) {
          diagonalArray.push(i);
        }
      }
      diagonalNumbers.push(diagonalArray);
    });
  
    // חישוב המספרים שמתאימים לכל אחד מהערכים ב"טורים"
    columns.forEach((column) => {
      const columnArray = [];
      for (let i = 1; i <= 36; i++) {
        if (unitsDigitEquals(i, column)) {
          columnArray.push(i);
        }
      }
      columnNumbers.push(columnArray);
    });
  
    // חישוב המספרים הזהים בין שני המערכים
    const uniqueDiagonalNumbers = new Set(diagonalNumbers.flat());
    const uniqueColumnNumbers = new Set(columnNumbers.flat());
  
    uniqueDiagonalNumbers.forEach((num) => {
      if (uniqueColumnNumbers.has(num)) {
        commonNumbers.push(num);
      }
    });
  
    // יצירת כל הצירופים האפשריים של 6 מספרים מהמערך של המספרים הזהים
    const sixDigitCombinations = getCombinations(commonNumbers, 6);
  
    // סינון הצירופים כך שכל צירוף יכיל לפחות מספר אחד מכל אחד ממערכי הטורים והאלכסונים
    // ולא יכיל יותר משני מספרים מכל אחד ממערכי הטורים והאלכסונים
    const filteredCombinations = sixDigitCombinations.filter(combo => 
      containsAtLeastOneFromEach(combo, columnNumbers) &&
      containsAtLeastOneFromEach(combo, diagonalNumbers) &&
      containsAtMostTwoFromEach(combo, columnNumbers) &&
      containsAtMostTwoFromEach(combo, diagonalNumbers)
    );
  
    return {
      diagonalNumbers,
      columnNumbers,
      commonNumbers,
      sixDigitCombinations: filteredCombinations,
    };
  }
  