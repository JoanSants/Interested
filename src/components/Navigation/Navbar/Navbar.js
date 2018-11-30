import React from 'react';

import {Navbar} from 'react-materialize';
import NavigationItems from '../NavigationItems/NavigationItems'

const navbar = props => {
    return (
        <Navbar brand='Interessados' right>
            <NavigationItems isAuth={props.isAuthenticated}/>
        </Navbar>
    )
}

export default navbar;