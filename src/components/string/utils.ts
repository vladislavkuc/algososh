import { TStep } from "./types";

export const getReverseStringSteps = (str: string): TStep[] => {
  const steps: TStep[] = [];
  const length = str.length;
  const array: string[] = str.split('');

  let start = 0;
  let end = length - 1;

  while (start <= end) {
    steps.push({
      startIndex: start,
      endIndex: end,
      currentState: [...array],
    });

    const letter = array[start]
    array[start] = array[end];
    array[end] = letter;

    start++;
    end--;
  };

  steps.push({
    startIndex: start,
    endIndex: end,
    currentState: [...array],
  });

  return steps;
};
