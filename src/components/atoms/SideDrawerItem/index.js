import React from 'react';
import PropTypes from 'prop-types';

import { NavLink } from 'react-router-dom';
import styles from "./index.module.css";


const sideDrawerItem = props => {
    return (
        <li className={styles.SideDrawerItem}>
            <NavLink to={props.link} exact={props.exact}>
                {props.children}
            </NavLink>
        </li>
    )
}

sideDrawerItem.propTypes = {
    link: PropTypes.string.isRequired,
    children: PropTypes.any.isRequired
}

export default sideDrawerItem;