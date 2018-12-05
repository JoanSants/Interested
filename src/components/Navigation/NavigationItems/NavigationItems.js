import React from 'react';
import { Dropdown, Button, NavItem } from 'react-materialize';
import {NavLink} from 'react-router-dom';

import NavigationItem from './NavigationItem/NavigationItem';
import Categories from './../Categories/Categories';

const navigationItems = props => {
    
    const accountDropDown = (
        <Dropdown trigger={
            <Button>Minha Conta</Button>
        }>
            <NavLink to='/my-interests'>Meus Interesses<NavItem divider /></NavLink>
            <NavLink to='/my-info'>Meus dados<NavItem divider /></NavLink>
            <NavLink to='/contacts'>Contatos<NavItem divider /></NavLink>
            <NavLink to='/logout'>Sair<NavItem divider /></NavLink>
        </Dropdown>
    )

    return (
        <ul>
            <NavigationItem link='/add-interest'>Em comprar</NavigationItem>
            <NavigationItem link='/keys'>Chaves</NavigationItem>
            {!props.isAuth ?
                <NavigationItem link='/authenticate'>Entrar</NavigationItem> :
                accountDropDown}
            <Categories />
        </ul>
    )
}

export default navigationItems;