import React from 'react';
import styles from './styles.module.css';

const HeadingPrimary = props => {
  return <h1 className={styles.HeadingPrimary}>{props.children}</h1>
}

export default HeadingPrimary;