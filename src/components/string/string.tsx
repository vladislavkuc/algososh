import React, { useState, useRef } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from './string.module.css';
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { TLetter } from "../../types/letter";

export const StringComponent: React.FC = () => {
  const [loader, setLoader] = useState(false);
  const [string, setString] = useState('');
  const [circles, setCircles] = useState<Array<TLetter>>([]);

  const valueRef = useRef<HTMLInputElement>(null);

  const inputChange = (value: string) => {
    setString(value);
  };

  const reverseString = (e: React.SyntheticEvent) => {
    e.preventDefault();
    valueRef.current!.value = '';
    setLoader(true);
    const length = string.length;
    setTimeout(() => {setLoader(false)}, Math.floor((length + 1) / 2) * 1000);

    const array: TLetter[] = string.split('').map(letter => { return { letter, state: ElementStates.Default}});
    const middle = Math.floor(length / 2);

    array[0].state = ElementStates.Changing;
    array[length - 1].state = ElementStates.Changing;

    setCircles(JSON.parse(JSON.stringify(array)));

    for (let i = 0; i < middle; i++) {
      const letter = array[i].letter;
      array[i].letter = array[length - i - 1].letter;
      array[length - i - 1].letter = letter;
      array[i].state = ElementStates.Modified;
      array[length - i - 1].state = ElementStates.Modified;
      array[i + 1].state = ElementStates.Changing;
      array[length - i - 2].state = ElementStates.Changing;
      setTimeout((arr) => { setCircles(arr) }, (i+1)*1000, JSON.parse(JSON.stringify(array)));
    }

    array[middle].state = ElementStates.Modified;
    array[middle - 1].state = ElementStates.Modified;
    setTimeout((arr) => {setCircles(arr)}, Math.floor((length + 1) / 2) * 1000, [...array]);
  };

  return (
    <SolutionLayout title="Строка">
      <form onSubmit={event => reverseString(event)} className={styles.wrapper}>
        <Input childRef={valueRef} changeValue={inputChange} extraClass={styles.input} placeholder="Введите текст" isLimitText={true} type="text" maxLength={11}/>
        <Button isLoader={loader} text="Развернуть" type="submit"/>
      </form>
      <div className={styles.container}>
        {
          circles.map((char, index) => <Circle key={index} tail={String(index)} state={char.state} letter={char.letter}></Circle>)
				}
      </div>
    </SolutionLayout>
  );
};
