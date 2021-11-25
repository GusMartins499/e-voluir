import React, { InputHTMLAttributes } from 'react';

import styles from './styles.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  register: any;
}

const InputForm: React.FC<InputProps> = ({ id, label, register, ...rest }) => {
  return (
    <div className={styles.inputBlock}>
      <label htmlFor={id}>{label}</label>
      <input type="text" name={id} id={id} {...register(`${id}`)} {...rest} />
    </div>
  );
};

export default InputForm;