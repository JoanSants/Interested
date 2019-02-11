import React from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './styles.module.css';

const category = props => {
    return(
        <li className={styles.CategoryItem}>
            <NavLink to={'/categories/' + props.name.toLowerCase()}>
                {props.children}
            </NavLink>
        </li>
    )
}

category.propTypes = {
    name: PropTypes.string.isRequired,
    children:PropTypes.any.isRequired
}

export default category;