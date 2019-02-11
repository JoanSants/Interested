import React, { Component } from 'react';
import CategoryInterests from '../../organisms/CategoryInterests';
import styles from './styles.module.css';

class Categories extends Component {
    render () {
        return (
            <div className={styles.Container}>
                <CategoryInterests/>
            </div>
        )
    }
}

export default Categories;