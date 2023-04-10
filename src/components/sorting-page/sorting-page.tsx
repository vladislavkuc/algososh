import React, { SyntheticEvent, useEffect, useState } from "react";
import styles from './sorting-page.module.css';
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Direction } from "../../types/direction";
import { TNumber } from "../../types/array-element";
import { ElementStates } from "../../types/element-states";
import { Column } from "../ui/column/column";

export const SortingPage: React.FC = () => {
  const [loader, setLoader] = useState('');
  const [method, setMethod] = useState('');
  const [array, setArray] = useState<Array<TNumber>>([]);

  const changeMethod = (value: string) => {
    setMethod(value);
  };

  const selectionSort = (direction: string) => {
    let seconds = 0;
    setLoader(direction);
    const arr = JSON.parse(JSON.stringify(array));
    const { length } = arr;
    for (let i = 0; i < length; i++) {

      arr[i].state = ElementStates.Changing;
      setTimeout((copy) => {setArray(copy)}, seconds*250, JSON.parse(JSON.stringify(arr)));
      seconds++;

      let ind = i;
      for (let j = i+1; j < length; j++) {
        arr[j].state = ElementStates.Changing;
        setTimeout((copy) => {setArray(copy)}, seconds*250, JSON.parse(JSON.stringify(arr)));
        arr[j].state = ElementStates.Default;
        setTimeout((copy) => {setArray(copy)}, (seconds+1)*250, JSON.parse(JSON.stringify(arr)));

        if ((arr[ind].value < arr[j].value && direction === 'descending')
        || (arr[ind].value > arr[j].value && direction === 'ascending')) {
          ind = j;
        };
        seconds++;
      };
      const temp = arr[i].value;
      arr[i].value = arr[ind].value;
      arr[ind].value = temp;

      arr[i].state = ElementStates.Modified;
      setTimeout((copy) => {setArray(copy)}, seconds*250, JSON.parse(JSON.stringify(arr)));
    }

    setTimeout((copy) => {
      setArray(copy);
      setLoader('');
    }, seconds*250, JSON.parse(JSON.stringify(arr)));
  };

  function bubbleSort(direction: string) {
    let seconds = 0;
    setLoader(direction);
    const arr = JSON.parse(JSON.stringify(array));
    const { length } = arr;

    for (let j = length - 1; j > 0; j--) {
      for (let i = 0; i < j; i++) {
        arr[i].state = ElementStates.Changing;
        arr[i + 1].state = ElementStates.Changing;
        setTimeout((copy) => {setArray(copy)}, seconds*500, JSON.parse(JSON.stringify(arr)));

        seconds++;

        arr[i].state = ElementStates.Default;
        arr[i + 1].state = ElementStates.Default;
        setTimeout((copy) => {setArray(copy)}, seconds*500, JSON.parse(JSON.stringify(arr)));

        if ((arr[i].value < arr[i + 1].value && direction === 'descending')
        || (arr[i].value > arr[i + 1].value && direction === 'ascending')) {
          const temp = arr[i].value;
          arr[i].value = arr[i + 1].value;
          arr[i + 1].value = temp;
        }
      }

      arr[j].state = ElementStates.Modified;
      setTimeout((copy) => {setArray(copy)}, seconds*500, JSON.parse(JSON.stringify(arr)));
    }

    arr[0].state = ElementStates.Modified;
    setTimeout((copy) => {
      setArray(copy);
      setLoader('');
    }, seconds*500, JSON.parse(JSON.stringify(arr)));
  }

  const sortArrDescending = (e: SyntheticEvent) => {
    e.preventDefault();
    if (method === ''){
      return
    };

    if (method === 'buble') {
      bubbleSort('descending');
    }

    if (method === 'selection'){
      selectionSort('descending');
    }
  };

  const sortArrAscending = (e: SyntheticEvent) => {
    e.preventDefault();
    if (method === ''){
      return
    };

    if (method === 'buble') {
      bubbleSort('ascending');
    }

    if (method === 'selection'){
      selectionSort('ascending');
    }
  };

  const randomArr = () => {
    const arr = [];
    const length = Math.floor(Math.random()*15) + 3;
    for (let i = 0; i < length; i++){
      arr.push({
        value: Math.floor(Math.random()*100),
        state: ElementStates.Default
      });
    };

    return [...arr]
  };

  const handleCreateArr = (e: SyntheticEvent) => {
    e.preventDefault();
    setLoader('create');

    setTimeout((arr) => {
      setArray(arr);
    }, 500, [...randomArr()]);

    setTimeout(() => {
      setLoader('');
    }, 1000);
  };

  useEffect(() => {
    setArray(randomArr());
  }, []);

  return (
    <SolutionLayout title="Сортировка массива">
      <form className={styles.wrapper}>
        <RadioInput extraClass={`${styles.radio}  mr-20`} label='Выбор' value='selection' name="method" changeValue={changeMethod}/>
        <RadioInput extraClass={`${styles.radio} ${styles['input-margin']}`} label='Пузырёк' value='buble' name="method" changeValue={changeMethod}/>
        <Button isLoader={loader === 'ascending'}
          sorting={Direction.Ascending}
          extraClass="mr-6"
          disabled={loader !== ''}
          text="По возрастанию"
          type="button"
          onClick={e => sortArrAscending(e)}
        />
        <Button
          isLoader={loader === 'descending'}
          sorting={Direction.Descending}
          extraClass="mr-40"
          disabled={loader !== ''}
          text="По убыванию"
          type="button"
          onClick={e => sortArrDescending(e)}
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
          array.map((char, index) =>
            <Column
              key={index}
              index={char.value}
              state={char.state}
            />)
				}
      </div>
    </SolutionLayout>
  );
};
