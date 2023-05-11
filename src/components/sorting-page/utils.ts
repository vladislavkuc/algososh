import { Direction } from "../../types/direction";
import { TSortStep } from "./types";

const arrMinLen = 3;
const arrMaxLen = 18;

const firstStep = {
  selectedIndexes: [],
  sortedIndexes: [],
};

export const getRandomArr = () => {
  const arr = [];
  const length = Math.floor(Math.random()*(arrMaxLen - arrMinLen)) + arrMinLen;
  for (let i = 0; i < length; i++){
    arr.push(Math.floor(Math.random()*100));
  };

  return [...arr]
};


export const getSortStepsByBubble = (array: number[], direction: string): TSortStep[] => {
  const steps: TSortStep[] = [{
    ...firstStep,
    currentState: [...array],
  }];

  const { length } = array;
  let swapHappened = false;
  let iteration = 0;

  do {
    iteration++;
    swapHappened = false;
    for (let i = 0; i < length - iteration; i++) {
      if ((array[i] < array[i + 1] && direction === 'descending')
      || (array[i] > array[i + 1] && direction === 'ascending')) {
        const temp = array[i];
        array[i] = array[i + 1];
        array[i + 1] = temp;
        swapHappened = true;
      }

      steps.push({
        currentState: [...array],
        selectedIndexes: [i, i + 1],
        sortedIndexes: [...steps[steps.length - 1].sortedIndexes]
      })
    }

    if (swapHappened) {
      steps.push({
        currentState: [...array],
        selectedIndexes: [0, 1],
        sortedIndexes: [...steps[steps.length - 1].sortedIndexes, array.length - iteration]
      })
    } else {
      steps.push({
        currentState: [...array],
        selectedIndexes: [0, 1],
        sortedIndexes: [...array.map((val, ind) => ind)]
      })
    };
  } while (swapHappened);

  return steps;
};

export const getSortStepsBySelection = (array: number[], direction: Direction): TSortStep[] => {
  const steps: TSortStep[] = [{
    ...firstStep,
    currentState: [...array],
  }];

  const { length } = array;
  for (let i = 0; i < length; i++) {
    let ind = i;
    for (let j = i+1; j < length; j++) {
      steps.push({
        currentState: [...array],
        selectedIndexes: [i, j],
        sortedIndexes: [ ...steps[steps.length - 1].sortedIndexes]
      })

      if ((array[ind] < array[j] && direction === Direction.Descending)
      || (array[ind] > array[j] && direction === Direction.Ascending)) {
        ind = j;
      };
    };

    const temp = array[i];
    array[i] = array[ind];
    array[ind] = temp;

    steps.push({
      currentState: [...array],
      selectedIndexes: [i, ind],
      sortedIndexes: [ ...steps[steps.length - 1].sortedIndexes, i]
    })
  }

  return steps;
};
