import React from 'react';
import styles from './styles.module.css';

const MyCoins = props => {
  return (
    <div className={styles.MyCoinsBox}>
      <div className={styles.MyCoinsInfo}><i className="material-icons md-light">panorama_fish_eye</i></div>
      <span className={styles.MyCoins}>{props.coins}</span>
    </div>
  )
}

export default MyCoins;