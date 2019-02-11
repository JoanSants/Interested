import React, {Component} from 'react';
import AllInterests from '../../organisms/AllInterests';
import styles from './styles.module.css';
import HeadingPrimary from '../../atoms/Headers/HeadingPrimary';

class Home extends Component {
  render(){
    return (
      <div className={styles.Container}>
        <HeadingPrimary>Principais Interesses</HeadingPrimary>
        <AllInterests/>
      </div>
    )
  }
}

export default Home;