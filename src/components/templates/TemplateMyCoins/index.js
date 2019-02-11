import React, { Component } from 'react';
import Coins from '../../organisms/Coins';
import styles from './styles.module.css';

class MyCoins extends Component {

    render() {
        return (
            <div className={styles.Container}>
                <Coins/>    
            </div>
        )
    }
}

export default MyCoins;