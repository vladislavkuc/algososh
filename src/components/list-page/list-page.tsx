import React, { SyntheticEvent, ReactElement, JSXElementConstructor, useEffect, useState, useRef } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { ElementStates } from "../../types/element-states";
import styles from "./list-page.module.css";
import { LinkedList } from "../../classes/linked-list";
import { TLetter } from "../../types/letter";
import { Node } from "../../classes/node";
import { nanoid } from "nanoid";

export const ListPage: React.FC = () => {
  const [loader, setLoader] = useState('');
  const [addTarget, setAddTarget] = useState<number | null>();
  const [remTarget, setRemTarget] = useState<number | null>();
  const [value, setValue] = useState('');
  const [removed, setRemoved] = useState<string | null>(null);
  const [index, setIndex] = useState<number>(-1);
  const [array, setArray] = useState<Array<TLetter>>([]);
  const [list, setList] = useState(new LinkedList<string>(
    (new Node<string>('0', new Node<string>('34', new Node<string>('8', new Node<string>('1', null)))))));

  const valueRef = useRef<HTMLInputElement>(null);
  const indexRef = useRef<HTMLInputElement>(null);


  const changeValue = (value: string) => {
    setValue(value);
  };

  const changeIndex = (value: string) => {
    setIndex(Number(value));
  };

  const manageNode = (e: SyntheticEvent, event: string, index: number, loader: string) => {
    e.preventDefault();
    valueRef.current!.value = '';

    setLoader(loader);
    event === 'rem' ? setRemTarget(index) : setAddTarget(index);
    if (index) {
      if (event === 'add') {
        list.push(new Node<string>(value, null));
      } else {
        setRemoved(list.pop());
      };
    } else {
      if (event === 'add') {
        list.shift(new Node<string>(value, null));
      } else {
        setRemoved(list.unshift());
      };
    }

    array[index].state = ElementStates.Modified;
    setTimeout((arr) => {
      setArray(arr);
    }, 500, JSON.parse(JSON.stringify(array)));

    setTimeout((arr) => {
      event === 'rem' ? setRemTarget(null) : setAddTarget(null);
      setLoader('');
      setArray(arr);
    }, 750, list.toArray().map(val => { return {state: ElementStates.Default, letter: val}}));
  };

  const addByIndex = (e: SyntheticEvent) => {
    e.preventDefault();

    if (index < 0 || !value || index > array.length - 1){
      return
    }

    valueRef.current!.value = '';
    indexRef.current!.value = '';

    setLoader('addmiddle');

    for(let i = 0; i < index + 1; i++) {
      if (i > 0) { array[i - 1].state = ElementStates.Changing; }
      setTimeout((copy) => {
        setAddTarget(i);
        setArray(copy);
      }, i*500, JSON.parse(JSON.stringify(array)));
    }

    list.insertAt(value, index);

    setTimeout((copy) => {
      setAddTarget(null);
      setArray(copy)
    },
    (index + 1) * 500,
    [...list.toArray().map((val, ind) => {
      return {state: index === ind ? ElementStates.Modified : ElementStates.Default, letter: val}
    })]);

    setTimeout((copy) => {
      setLoader('');
      setArray(copy)
    }, (index + 2) * 500, [...list.toArray().map(val => { return {state: ElementStates.Default, letter: val}})]);
  }

  const deleteByIndex = (e: SyntheticEvent) => {
    e.preventDefault();

    if (index < 0 || index > array.length - 1){
      return
    }

    valueRef.current!.value = '';
    indexRef.current!.value = '';

    setLoader('remmiddle');

    for(let i = 0; i < index + 1; i++) {
      array[i].state = ElementStates.Changing;
      setTimeout((copy) => {
        setArray(copy);
      }, i*500, JSON.parse(JSON.stringify(array)));
    }

    setTimeout((copy) => {
      setRemTarget(index);
      setArray(copy)
    }, (index + 1) * 500, [...list.toArray().map(val => { return {state: ElementStates.Default, letter: val}})]);

    setRemoved(list.deleteAt(index));

    setTimeout((copy) => {
      setRemTarget(null);
      setLoader('');
      setArray(copy)
    }, (index + 2) * 500, [...list.toArray().map(val => { return {state: ElementStates.Default, letter: val}})]);
  }

  useEffect(() => {
    setArray(list.toArray().map(val => { return {state: ElementStates.Default, letter: val}}));
  }, []);

  return (
    <SolutionLayout title="Связный список">
      <form className={styles.wrapper}>
        <div className={styles.row}>
          <Input childRef={valueRef} changeValue={changeValue} extraClass={styles.input} placeholder="Введите значение" isLimitText={true} type="text" maxLength={5}/>
          <Button
            isLoader={loader === 'addhead'}
            disabled={loader !== '' || !value}
            text="Добавить в head"
            type="button"
            onClick={e => manageNode(e, 'add', 0, 'addhead')}
          />
          <Button
            isLoader={loader === 'addtail'}
            disabled={loader !== '' || !value}
            text="Добавить в tail"
            type="button"
            onClick={e => manageNode(e, 'add', array.length - 1, 'addtail')}
          />
          <Button
            isLoader={loader === 'remhead'}
            disabled={loader !== '' || !array.length}
            text="Удалить из head"
            type="button"
            onClick={e => manageNode(e, 'rem', 0, 'remhead')}
          />
          <Button
            isLoader={loader === 'remtail'}
            disabled={loader !== '' || !array.length}
            text="Удалить из tail"
            type="button"
            onClick={e => manageNode(e, 'rem', array.length - 1, 'remtail')}
          />
        </div>
        <div className={styles.row}>
          <Input childRef={indexRef} changeValue={changeIndex} isLimitText={true} extraClass={styles.input} min={0} max={array.length - 1} placeholder="Введите индекс" type="number"/>
          <Button
            isLoader={loader === 'addmiddle'}
            linkedList="big"
            disabled={loader !== '' || index < 0 || !indexRef.current!.value || !valueRef.current!.value || index > array.length - 1}
            text="Добавить по индексу"
            type="button"
            onClick={e => addByIndex(e)}
          />
          <Button
            isLoader={loader === 'remmiddle'}
            linkedList="big"
            disabled={loader !== '' || index < 0 || !indexRef.current!.value || index > array.length - 1}
            text="Удалить по индексу"
            type="button"
            onClick={e => deleteByIndex(e)}
          />
        </div>
      </form>
      <div className={styles.container}>
        {
          array.map((char, index) =>
          <div
            className={styles.modcircle}
            key={nanoid()}
          >
            <Circle
              head={index === addTarget ? <Circle letter={value} state={ElementStates.Changing} isSmall={true}/>
              : index === 0 ? 'head'
              : ''}
              index={index}
              tail={index === remTarget && removed ? <Circle letter={removed} state={ElementStates.Changing} isSmall={true}/>
              : index === array.length - 1 ? 'tail'
              : ''}
              state={char.state}
              letter={index === remTarget && removed ? '' : String(char.letter)}
            />
            { index !== array.length - 1 && <ArrowIcon /> }
          </div>)
				}
      </div>
    </SolutionLayout>
  );
};
