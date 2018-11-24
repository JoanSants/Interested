import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import Categories from './../Categories/Categories';

const navigationItems = props => {
    return (
        <ul>
            <NavigationItem link='/add-interest'>Em comprar</NavigationItem>
            <NavigationItem link='/add-item'>Em vender</NavigationItem>
            <Categories/>
        </ul>
    )
}

export default navigationItems;