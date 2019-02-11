import React from 'react';
import styles from './styles.module.css';

const MainAdvice = props => {
  return <h1 className={styles.MainAdvice}>{props.children}</h1>
}

export default MainAdvice;