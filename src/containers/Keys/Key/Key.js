import React from 'react';
import { CardPanel, Button } from 'react-materialize';

import styles from './Key.module.css';

const key = props => {
    return (
            <CardPanel className={styles.Key}>
                <i className="material-icons">vpn_key</i>
                <p>Nome: {props.name}</p>
                <p>Valor: {props.price}</p>
                <p>Quantidade: {props.quantity}</p>
                <Button onClick={() => props.buyKey(props.id)}>Comprar Chave</Button>
            </CardPanel>
    )
}

export default key;