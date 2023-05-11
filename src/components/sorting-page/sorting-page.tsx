import React, { SyntheticEvent, useEffect, useState } from "react";
import styles from './sorting-page.module.css';
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { Column } from "../ui/column/column";
import { getRandomArr, getSortStepsByBubble, getSortStepsBySelection } from "./utils";

export const SortingPage: React.FC = () => {
  const [loader, setLoader] = useState<Direction | '' | 'create'>('');
  const [method, setMethod] = useState<'bubble' | 'selection'>('selection');
  const [array, setArray] = useState<Array<number>>([]);
  const [sortedIndexes, setSortedIndexes] = useState<Array<number>>([]);
  const [selectedIndexes, setSelectedIndexes] = useState<Array<number>>([]);
  const [stepsController, setStepsController] = useState<NodeJS.Timer>();

  const changeMethod = (value: string) => {
    setMethod(value === 'bubble' || value === 'selection' ? value : 'selection');
  };

  const sortArray = (event: SyntheticEvent, direction: Direction) => {
    event.preventDefault();
    const steps = method === 'bubble'
    ? getSortStepsByBubble([...array], direction)
    : getSortStepsBySelection([...array], direction);

    const stepsIterator = setInterval(() => {
      if (steps.length > 0) {
        setLoader(direction);
        const step = steps.shift()!;
        setArray([...step.currentState]);
        setSortedIndexes([...step.sortedIndexes]);
        setSelectedIndexes([...step.selectedIndexes]);
      } else {
        setLoader('');
        clearInterval(stepsIterator);
      }
    }, 250);

    setStepsController(stepsIterator);
  };

  const handleColumnState = (index: number): ElementStates => {
    if (sortedIndexes.includes(index)) {
      return ElementStates.Modified;
    }

    if (selectedIndexes.includes(index)) {
      return ElementStates.Changing;
    }

    return ElementStates.Default;
  };

  const handleCreateArr = (e: SyntheticEvent) => {
    e.preventDefault();
    clearInterval(stepsController);
    setArray([]);
    setSelectedIndexes([]);
    setSortedIndexes([]);
    setLoader('create');

    setTimeout((arr) => {
      setArray(arr);
    }, 250, [...getRandomArr()]);

    setTimeout(() => {
      setLoader('');
    }, 500);
  };

  useEffect(() => {
    setArray(getRandomArr());

    return () => { clearInterval(stepsController) };
  }, []);

  return (
    <SolutionLayout title="Сортировка массива">
      <form className={styles.wrapper}>
        <RadioInput extraClass={`${styles.radio}  mr-20`} label='Выбор' value='selection' name="method" changeValue={changeMethod}/>
        <RadioInput extraClass={`${styles.radio} ${styles['input-margin']}`} label='Пузырёк' value='bubble' name="method" changeValue={changeMethod}/>
        <Button isLoader={loader === Direction.Ascending}
          sorting={Direction.Ascending}
          extraClass="mr-6"
          disabled={loader !== ''}
          text="По возрастанию"
          type="button"
          onClick={e => sortArray(e, Direction.Ascending)}
        />
        <Button
          isLoader={loader === Direction.Descending}
          sorting={Direction.Descending}
          extraClass="mr-40"
          disabled={loader !== ''}
          text="По убыванию"
          type="button"
          onClick={e => sortArray(e, Direction.Descending)}
        />
        <Button
          isLoader={loader === 'create'}
          disabled={loader !== ''}
          text="Новый массив"
          type="button"
          onClick={e => handleCreateArr(e)}
        />
      </form>
      <div className={styles.container}>
        {
          array.map((num, index) =>
            <Column
              key={index}
              index={num}
              state={handleColumnState(index)}
            />)
				}
      </div>
    </SolutionLayout>
  );
};
