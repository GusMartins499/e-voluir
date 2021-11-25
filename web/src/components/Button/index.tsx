import React, { ButtonHTMLAttributes } from 'react';

import styles from "./styles.module.scss";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <div className={styles.buttonContainer}>
    <button type="button" {...rest}>{children}</button>
  </div>
);

export default Button;