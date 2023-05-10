import { Direction } from "../../types/direction";
const { getSortStepsByBubble, getSortStepsBySelection } = jest.requireActual("./utils");

describe('Алгоритм сортировки пузырьком', () => {
  test('Проверка пустого массива', () => {
    expect(getSortStepsByBubble([], Direction.Ascending).pop().currentState).toEqual([]);
    expect(getSortStepsByBubble([], Direction.Descending).pop().currentState).toEqual([]);
  });

  test('Проверка массива из одного элемента', () => {
    expect(getSortStepsByBubble([5], Direction.Ascending).pop().currentState).toEqual([5]);
    expect(getSortStepsByBubble([5], Direction.Descending).pop().currentState).toEqual([5]);
  });

  test('Проверка массива из нескольких элементов', () => {
    expect(getSortStepsByBubble([1, 15, 10], Direction.Ascending).pop().currentState).toEqual([1, 10, 15]);
    expect(getSortStepsByBubble([1, 15, 10], Direction.Descending).pop().currentState).toEqual([15, 10, 1]);
  });
});

describe('Алгоритм сортировки выбором', () => {
  test('Проверка пустого массива', () => {
    expect(getSortStepsBySelection([], Direction.Ascending).pop().currentState).toEqual([]);
    expect(getSortStepsBySelection([], Direction.Descending).pop().currentState).toEqual([]);
  });

  test('Проверка массива из одного элемента', () => {
    expect(getSortStepsBySelection([5], Direction.Ascending).pop().currentState).toEqual([5]);
    expect(getSortStepsBySelection([5], Direction.Descending).pop().currentState).toEqual([5]);
  });

  test('Проверка массива из нескольких элементов', () => {
    expect(getSortStepsBySelection([1, 15, 10], Direction.Ascending).pop().currentState).toEqual([1, 10, 15]);
    expect(getSortStepsBySelection([1, 15, 10], Direction.Descending).pop().currentState).toEqual([15, 10, 1]);
  });
});

export {};
