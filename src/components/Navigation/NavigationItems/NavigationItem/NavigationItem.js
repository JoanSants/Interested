import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavigationItem.module.css';

const navigationItem = props => {
    return (
            <NavLink className={styles.NavigationItem} to={props.link} exact={props.exact}>
                {props.children}
            </NavLink>
    )
}

export default navigationItem;