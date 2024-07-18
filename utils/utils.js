// utils/utils.js

function getAllCombinations(array, count) {
  if (count === 0) return [[]];
  if (array.length === 0) return [];

  const [first, ...rest] = array;
  const withoutFirst = getAllCombinations(rest, count);
  const withFirst = getAllCombinations(rest, count - 1).map((combination) => [
    first,
    ...combination,
  ]);

  return [...withoutFirst, ...withFirst];
}

export function selectAllPossibleNumbers(targetSums) {
  let numbers = Array.from({ length: 36 }, (_, i) => i + 1);

  let validNumbersPerTarget = targetSums.map((targetSum) =>
    numbers.filter((num) => (num - 1) % 9 === (targetSum - 1) % 9)
  );

  // Find all possible combinations for each target sum
  let allPossibleCombinations = validNumbersPerTarget.reduce(
    (acc, validNumbers) => {
      if (acc.length === 0) {
        return validNumbers.map((num) => [num]);
      }
      let newCombinations = [];
      acc.forEach((comb) => {
        validNumbers.forEach((num) => {
          newCombinations.push([...comb, num]);
        });
      });
      return newCombinations;
    },
    []
  );

  // Add random numbers to each combination to meet the required count
  let allPossibleSelections = allPossibleCombinations.map(
    (selectedByCriteria) => {
      let remainingCount = 6 - selectedByCriteria.length;
      let randomNumbers =
        getAllCombinations(
          numbers.filter((num) => !selectedByCriteria.includes(num)),
          remainingCount
        )[0] || [];
      let selectedNumbers = [...selectedByCriteria, ...randomNumbers];

      return { selectedNumbers, selectedByCriteria, randomNumbers };
    }
  );

  return allPossibleSelections;
}
