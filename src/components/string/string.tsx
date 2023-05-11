import React, { useState, useRef, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from './string.module.css';
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { getReverseStringSteps } from "./utils";

export const StringComponent: React.FC = () => {
  const [loader, setLoader] = useState(false);
  const [string, setString] = useState('');
  const [timer, setTimer] = useState<NodeJS.Timer>();
  const [letters, setLetters] = useState<Array<string>>([]);
  const [startIndex, setStartIndex] = useState<number>();
  const [endIndex, setEndIndex] = useState<number>();

  const valueRef = useRef<HTMLInputElement>(null);

  const inputChange = (value: string) => {
    setString(value);
  };

  const reverseString = (e: React.SyntheticEvent) => {
    e.preventDefault();
    valueRef.current!.value = '';
    setLoader(true);
    const steps = getReverseStringSteps(string);

    const stepsIterator = setInterval(() => {
      if (steps.length > 0) {
        const step = steps.shift()!;
        setLetters([...step.currentState]);
        setStartIndex(step.startIndex);
        setEndIndex(step.endIndex);
      } else {
        setLoader(false);
        clearInterval(stepsIterator);
      }
    }, 500);

    setTimer(stepsIterator);
  };

  const hadleLetterState = (index: number): ElementStates => {
    if (startIndex && endIndex && (index < startIndex || index > endIndex)) {
      return ElementStates.Modified;
    }

    if (startIndex && endIndex && (index === startIndex || index === endIndex)) {
      return ElementStates.Changing;
    }

    return ElementStates.Default;
  };

  return (
    <SolutionLayout title="Строка">
      <form onSubmit={event => reverseString(event)} className={styles.wrapper}>
        <Input childRef={valueRef} changeValue={inputChange} extraClass={styles.input} placeholder="Введите текст" isLimitText={true} type="text" maxLength={11}/>
        <Button isLoader={loader} disabled={!string || !valueRef.current?.value} text="Развернуть" type="submit"/>
      </form>
      <div className={styles.container}>
        {
          letters.map((letter, index) => <Circle key={index} tail={String(index)} state={hadleLetterState(index)} letter={letter}></Circle>)
				}
      </div>
    </SolutionLayout>
  );
};
