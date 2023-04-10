import React, { SyntheticEvent, useState, useRef } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { TLetter } from "../../types/letter";
import { ElementStates } from "../../types/element-states";
import styles from "./queue-page.module.css";
import { Queue } from "../../classes/queue";

export const QueuePage: React.FC = () => {
  const [value, setValue] = useState('');
  const [queue, setQueue] = useState(new Queue<TLetter>(7));
  const [loader, setLoader] = useState('');

  const valueRef = useRef<HTMLInputElement>(null);

  const inputChange = (value: string) => {
    setValue(value);
  };

  const addElement = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!value || queue.isFull()) {
      return;
    }
    
    valueRef.current!.value = '';

    setLoader('add');

    queue.enqueue({
      letter: value,
      state: ElementStates.Changing
    });

    setTimeout(() => {
      queue.takeTail()!.state = ElementStates.Default;
    }, 250);

    setTimeout(() => {
      setLoader('');
    }, 500);
  };

  const deleteElement = (e: SyntheticEvent) => {
    e.preventDefault();
    if (queue.isEmpty()) {
      return
    }

    setLoader('delete');
    queue.peak()!.state = ElementStates.Changing;

    setTimeout(() => {
      queue.peak()!.state = ElementStates.Default;
      queue.dequeue();
    }, 250);

    setTimeout(() => {
      setLoader('');
    }, 500);
  };

  const clearStack = (e: SyntheticEvent) => {
    e.preventDefault();
    if(queue.isEmpty()){
      return
    }
    setLoader('clear');

    setTimeout(() => {
      queue.clear();
    }, 250);

    setTimeout(() => {
      setLoader('');
    }, 500);
  };

  return (
    <SolutionLayout title="Очередь">
      <form onSubmit={e => addElement(e)} className={styles.wrapper}>
        <Input childRef={valueRef} changeValue={inputChange} extraClass={styles.input} placeholder="Введите текст" isLimitText={true} type="text" maxLength={5}/>
        <Button isLoader={loader === 'add'} extraClass="mr-6" disabled={loader !== '' || queue.isFull()} text="Добавить" type="submit"/>
        <Button isLoader={loader === 'delete'} extraClass="mr-40" disabled={loader !== '' || queue.isEmpty()} text="Удалить" type="button" onClick={e => deleteElement(e)}/>
        <Button isLoader={loader === 'clear'} disabled={loader !== '' || queue.isEmpty()} text="Очистить" type="button" onClick={e => clearStack(e)}/>
      </form>
      <div className={styles.container}>
        {
          typeof queue.show === 'function' && queue.show()
          .map((char, index) => <Circle
            key={index}
            head={(index === queue.getHead() && !queue.isEmpty()) ? 'head' : ''}
            tail={(index === queue.getTail() && !queue.isEmpty()) ? 'tail' : ''}
            index={index}
            state={char == null ?  ElementStates.Default : char.state}
            letter={char == null ?  '' : char.letter}
          ></Circle>)
				}
      </div>
    </SolutionLayout>
  );
};
