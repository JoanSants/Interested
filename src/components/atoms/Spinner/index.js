import React from 'react';
import styles from './styles.module.css';

class CircularDeterminate extends React.Component {

  render() {
    return (
      <div className={styles.LdsRing}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }
}

export default CircularDeterminate;
