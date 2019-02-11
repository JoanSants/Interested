import React from 'react';
import Button from '../../atoms/Buttons/Button';
import styles from './styles.module.css';

const contact = props => {

    return (
        <div className={styles.ContactBox}>
            <div className={styles.ContactInfo}>
                <p className={styles.ContactName}>{props.name}</p>
            </div>
            <div className={styles.ContactButtonBox}>
                <Button onClick={() => { props.fetchConcact(props.id) }}>Ver contato</Button>
            </div>
        </div>
    )
}

export default contact;