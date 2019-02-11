import React, { Component } from 'react';
import Contacts from '../../organisms/Contacts';
import styles from './styles.module.css';

class MyContacts extends Component {

    render() {        
        return (
            <div className={styles.Container}>
                <Contacts/>
            </div>
        )
    }
}

export default MyContacts;