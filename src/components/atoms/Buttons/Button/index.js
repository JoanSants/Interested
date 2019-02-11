import React from 'react';
import styles from './styles.module.css';

const Button = props => {
  return <button className={styles.Button} disabled={props.disabled} onClick={props.onClick}>{props.children}</button>
}

export default Button;