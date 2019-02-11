import React from 'react';
import styles from '../commonStyles.module.css';

const InputText = props => {
  return <input className={styles.CommonInput} type="text" {...props}/>
}

export default InputText;