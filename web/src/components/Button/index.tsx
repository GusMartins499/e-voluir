import React, { ButtonHTMLAttributes } from 'react';
import './styles.css';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <div className="button-container">
    <button type="button" {...rest}>{children}</button>
  </div>
);

export default Button;