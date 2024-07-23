export function findNumbers({ diagonals, columns, comboLength = 6 }) {
  console.log("comboLength: ", comboLength);

  function sumOfDigitsEquals(number, value) {
    let sum = Math.floor(number / 10) + (number % 10);
    if (sum > 9) {
      sum = Math.floor(sum / 10) + (sum % 10);
    }
    return sum === value;
  }

  function unitsDigitEquals(number, value) {
    let unitsDigit = number % 10;
    if (unitsDigit > 9) {
      unitsDigit = Math.floor(unitsDigit / 10) + (unitsDigit % 10);
    }
    return unitsDigit === value;
  }

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

  function containsAtLeastOneFromEach(combo, arrays) {
    return arrays.every((array) => array.some((num) => combo.includes(num)));
  }

  function containsAtMostTwoFromEach(combo, arrays) {
    return arrays.every((array) => {
      const count = combo.filter((num) => array.includes(num)).length;
      return count <= 2;
    });
  }

  const diagonalNumbers = [];
  const columnNumbers = [];
  const commonNumbers = [];

  diagonals.forEach((diagonal) => {
    const diagonalArray = [];
    for (let i = 1; i <= 36; i++) {
      if (sumOfDigitsEquals(i, diagonal)) {
        diagonalArray.push(i);
      }
    }
    diagonalNumbers.push(diagonalArray);
  });

  columns.forEach((column) => {
    const columnArray = [];
    for (let i = 1; i <= 36; i++) {
      if (unitsDigitEquals(i, column)) {
        columnArray.push(i);
      }
    }
    columnNumbers.push(columnArray);
  });

  const uniqueDiagonalNumbers = new Set(diagonalNumbers.flat());
  const uniqueColumnNumbers = new Set(columnNumbers.flat());

  uniqueDiagonalNumbers.forEach((num) => {
    if (uniqueColumnNumbers.has(num)) {
      commonNumbers.push(num);
    }
  });

  const combinations = getCombinations(commonNumbers, comboLength);

  const filteredCombinations = combinations.filter(
    (combo) =>
      containsAtLeastOneFromEach(combo, columnNumbers) &&
      containsAtLeastOneFromEach(combo, diagonalNumbers) &&
      containsAtMostTwoFromEach(combo, columnNumbers) &&
      containsAtMostTwoFromEach(combo, diagonalNumbers)
  );

  return {
    diagonalNumbers,
    columnNumbers,
    commonNumbers,
    combinations: filteredCombinations,
  };
}
