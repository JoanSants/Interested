import React from 'react';

import {Navbar} from 'react-materialize';
import NavigationItems from '../NavigationItems/NavigationItems'

const navbar = props => {
    return (
        <Navbar brand='Interessados' right>
            <NavigationItems/>
        </Navbar>
    )
}

export default navbar;