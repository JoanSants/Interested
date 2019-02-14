import React from 'react';
import styles from './styles.module.css';

const InputSelect = props => {
  return (
    <select {...props} className={styles.SelectInput}>
        {props.options.map(option => (
          <option value={option.value} key={option.value}>
            {option.displayValue}
          </option>
        ))}
      </select>
  )
}

export default InputSelect;