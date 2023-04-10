import React, { SyntheticEvent, useState, useRef } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './fibonacci-page.module.css';
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

export const FibonacciPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<number>();
  const [loader, setLoader] = useState(false);
  const [numbers, setNumbers] = useState<Array<number>>([]);

  const valueRef = useRef<HTMLInputElement>(null);

  const inputChange = (value: string) => {
    setInputValue(Number(value));
  };

  const calculateFibonacci = (e: SyntheticEvent) => {
    e.preventDefault();
    if (inputValue != null && inputValue > 0) {
      valueRef.current!.value = '';
      setLoader(true);
      const array: number[] = [1, 1];
      for (let i = 2; i < inputValue + 1; i++) {
        array.push(array[i - 1] + array[i - 2]);
      };
      for (let i = 0; i < inputValue + 1; i++) {
        setTimeout((array) => {setNumbers(array)}, (i + 1)* 500, [...array.slice(0, i + 1)]);
      };
      setTimeout(() => {setLoader(false)}, (inputValue + 1) * 500);

    };
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form onSubmit={event => calculateFibonacci(event)} className={styles.wrapper}>
        <Input childRef={valueRef} changeValue={inputChange} extraClass={styles.input} placeholder="Введите текст" isLimitText={true} type="number" max={19}/>
        <Button disabled={!inputValue || !valueRef.current!.value || inputValue < 0 || inputValue > 19} isLoader={loader} extraClass={styles.button} text="Рассчитать" type="submit"/>
      </form>
      <div className={styles.container}>
        <div className={`${styles["first-row"]} ${styles.row}`}>
          {numbers.slice(0, 10).map((number, index) => <Circle key={index} tail={String(index)} letter={String(number)}></Circle>)}
        </div>
        <div className={`${styles["second-row"]} ${styles.row}`}>
          {numbers.slice(10, 20).map((number, index) => <Circle key={index} tail={String(index + 10)} letter={String(number)}></Circle>)}
        </div>
      </div>
    </SolutionLayout>
  );
};
