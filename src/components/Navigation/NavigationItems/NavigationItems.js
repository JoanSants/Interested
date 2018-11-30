import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import Categories from './../Categories/Categories';

const navigationItems = props => {
    return (
        <ul>
            <NavigationItem link='/add-interest'>Em comprar</NavigationItem>
            <NavigationItem link='/add-item'>Em vender</NavigationItem>
            {!props.isAuth ? 
                <NavigationItem link='/authenticate'>Entrar</NavigationItem> : 
                <NavigationItem link='/logout'>Sair</NavigationItem> }
            <Categories/>
        </ul>
    )
}

export default navigationItems;