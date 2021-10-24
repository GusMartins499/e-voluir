import React, { InputHTMLAttributes } from 'react';
import { IconBaseProps } from 'react-icons';

import './styles.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  icon?: React.ComponentType<IconBaseProps>;
  register?: any;
}

const Input: React.FC<InputProps> = ({ id, icon: Icon, register, ...rest }) => {
  return (
    <div className="input-container">
      {Icon && <Icon size={20} color="#fff" />}
      <input id={id} name={id} {...register(`${id}`)} {...rest} />
    </div>
  );
};

export default Input;