import React from 'react';
import {NavLink} from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';

const category = props => {
    return(
        <NavLink to={'/categories/' + props.name.toLowerCase()}><MenuItem onClick={props.handleClose}>{props.children}</MenuItem></NavLink>
    )
}

export default category;