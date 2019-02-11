import React from 'react';
import { NavLink } from 'react-router-dom';

import Button from '../../atoms/Buttons/Button';
import styles from './styles.module.css';

const coin = props => {

    return (
        <div className={styles.CoinBox}>
            <div className={styles.CoinIcon}>
            <i className="material-icons md-light">panorama_fish_eye</i>
            </div>
            <div className={styles.CoinInfos}>
                <p className={styles.CoinInfo}>{props.name}</p>
                <p className={styles.CoinMainInfo}>{props.quantity}</p>
                <p className={styles.CoinInfo}>R$ {props.price}</p>
            </div>
            <div className={styles.CoinButtonBox}>
                {props.isAuth
                    ?
                    <Button onClick={() => props.buyKey(props.id)}>Comprar Coin</Button>
                    :
                    <NavLink to='/authenticate'><Button>Realizar Login</Button></NavLink>
                }
            </div>
        </div>
    )
}

export default coin;
