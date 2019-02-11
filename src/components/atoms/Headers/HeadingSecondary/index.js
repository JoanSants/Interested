import React from 'react';
import styles from './styles.module.css';

const HeadingSecondary = props => {
  return <h2 className={styles.HeadingSecondary}>{props.children}</h2>
}

export default HeadingSecondary;