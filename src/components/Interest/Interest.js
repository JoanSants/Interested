import React from 'react';
import { Card, CardTitle } from 'react-materialize';
import styles from './interest.module.css';

const interest = props => {
    return (
        <Card className={styles.Card} header={<CardTitle reveal image={props.interestImage} waves='light' />}
            title={props.name}
            reveal={<p>{props.description}</p>}>
            {'R$' + props.price + ',00'}
        </Card>
    )
}

export default interest;