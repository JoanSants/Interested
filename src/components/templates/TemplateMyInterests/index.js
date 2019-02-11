import React, { Component } from 'react';

import Interests from '../../../components/organisms/Interests';
import styles from './styles.module.css';

class MyInterests extends Component {
    render() {
        return (
            <div className={styles.Container}>
                <Interests/>
            </div>
        )
    }
}

export default MyInterests;