import React, { TextareaHTMLAttributes } from 'react';

import styles from './styles.module.scss';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label: string;
  register: any;
}

const Textarea: React.FC<TextareaProps> = ({ id, label, register, ...rest }) => {
  return (
    <div className={styles.textareaBlock}>
      <label htmlFor={id}>{label}</label>
      <textarea id={id} name={id} {...register(`${id}`)} {...rest} />
    </div>
  );
}

export default Textarea;