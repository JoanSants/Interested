import React from 'react';
import { Card, CardTitle } from 'react-materialize';
import styles from './interest.module.css';

const interest = props => {
    return (
        <Card className={styles.Card} header={<CardTitle reveal image={props.interestImage} waves='light' />}
            title="Card Title"
            reveal={<p>Here is some more information about this product that is only revealed once clicked on.</p>}>
            <p>This is a link</p>
        </Card>
    )
}

export default interest;