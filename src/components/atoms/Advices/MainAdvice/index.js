import React from 'react';
import styles from './styles.module.css';

const MainAdvice = props => {
  return <div className={styles.MainAdvice}><h1>{props.children}</h1></div>
}

export default MainAdvice;