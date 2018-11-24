import React from 'react';
import {NavLink} from 'react-router-dom';
import {NavItem} from 'react-materialize'

const category = props => {
    return(
        <NavLink to={'/categories/' + props.name}>{props.children}<NavItem divider /></NavLink>
    )
}

export default category;