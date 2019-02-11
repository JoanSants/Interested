import React from 'react';
import styles from '../commonStyles.module.css';

const InputPassword = props => {
  return <input className={styles.CommonInput} type="password" {...props}/>
}

export default InputPassword;