import React, { SelectHTMLAttributes } from "react";

import styles from "../../styles/components/Select.module.scss";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  label: string;
  options: Array<{
    value: string;
    label: string;
  }>;
}

const Select: React.FC<SelectProps> = ({ id, label, options, ...rest }) => {
  return (
    <div className={styles.selectBlock}>
      <label htmlFor={id}>{label}</label>
      <select value="" id={id} name={id} {...rest}>
        <option value="" disabled hidden>
          Selecione uma opção
        </option>
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
