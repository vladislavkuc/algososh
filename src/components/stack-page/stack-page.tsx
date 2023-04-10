import React, { SyntheticEvent, useState, useRef } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { TLetter } from "../../types/letter";
import { ElementStates } from "../../types/element-states";
import styles from "./stack-page.module.css";
import { Stack } from "../../classes/stack";

export const StackPage: React.FC = () => {
  const [value, setValue] = useState('');
  const [stack, setStack] = useState(new Stack<TLetter>());
  const [loader, setLoader] = useState('');

  const valueRef = useRef<HTMLInputElement>(null);

  const inputChange = (value: string) => {
    setValue(value);
  };

  const addElement = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!value) {
      return;
    }
    valueRef.current!.value = '';

    setLoader('add');

    stack.push({
      letter: value,
      state: ElementStates.Changing
    });

    setTimeout(() => {
      stack.peak()!.state = ElementStates.Default;
    }, 250);

    setTimeout(() => {
      setLoader('');
    }, 500);
  };

  const deleteElement = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!stack.getSize()) {
      return
    }

    setLoader('delete');
    stack.peak()!.state = ElementStates.Changing;

    setTimeout(() => {
      stack.pop();
    }, 250);

    setTimeout(() => {
      setLoader('');
    }, 500);
  };

  const clearStack = (e: SyntheticEvent) => {
    e.preventDefault();
    if(!stack.getSize()){
      return
    }
    setLoader('clear');

    setTimeout(() => {
      stack.clear();
    }, 250);

    setTimeout(() => {
      setLoader('');
    }, 500);
  };

  return (
    <SolutionLayout title="Стек">
      <form onSubmit={e => addElement(e)} className={styles.wrapper}>
        <Input childRef={valueRef} changeValue={inputChange} extraClass={styles.input} placeholder="Введите текст" isLimitText={true} type="text" maxLength={5}/>
        <Button isLoader={loader === 'add'} extraClass="mr-6" disabled={loader !== ''} text="Добавить" type="submit"/>
        <Button isLoader={loader === 'delete'} extraClass="mr-40" disabled={loader !== ''} text="Удалить" type="button" onClick={e => deleteElement(e)}/>
        <Button isLoader={loader === 'clear'} disabled={loader !== ''} text="Очистить" type="button" onClick={e => clearStack(e)}/>
      </form>
      <div className={styles.container}>
        {
          typeof stack.show === 'function' && stack.show().map((char, index) => <Circle key={index} head={index === stack.getSize() - 1 ? 'top' : ''} tail={String(index)} state={char.state} letter={char.letter}></Circle>)
				}
      </div>
    </SolutionLayout>
  );
};
