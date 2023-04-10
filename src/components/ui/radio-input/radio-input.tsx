import React, { SyntheticEvent } from "react";
import { nanoid } from "nanoid";
import styles from "./radio-input.module.css";

interface RadioProps extends React.HTMLProps<HTMLInputElement> {
  label: string;
  value: string;
  name: string;
  changeValue: (value: string) => void;
  extraClass?: string;
}

export const RadioInput: React.FC<RadioProps> = ({
  label = "Введите текст",
  extraClass = "",
  changeValue,
  value,
  ...rest
}) => {
  const id = nanoid();

  return (
    <div className={`${styles.content} ${extraClass}`} onClick={(e: SyntheticEvent) => changeValue(value)}>
      <input className={styles.input} type="radio" id={id} {...rest}/>
      <label className={`text text_type_button ${styles.label}`} htmlFor={id}>
        {label}
      </label>
    </div>
  );
};
