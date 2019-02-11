import React from 'react';
import styles from '../commonStyles.module.css';

const InputEmail = props => {
  return <input className={styles.CommonInput}type="email" {...props}/>
}

export default InputEmail;