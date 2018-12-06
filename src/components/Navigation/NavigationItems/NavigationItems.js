import React from 'react';
import { NavLink } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = props => {

    const accountDropDown = (
        <List>
            <Divider />
            <NavLink to='/my-interests'><ListItem button><ListItemText primary='Meus Interesses' /></ListItem></NavLink>
            <NavLink to='/contacts'><ListItem button><ListItemText primary='Meus Contatos' /></ListItem></NavLink>
            <NavLink to='/my-info'><ListItem button><ListItemText primary='Editar contato' /></ListItem></NavLink>
            <NavLink to='/logout'><ListItem button><ListItemText primary='Sair' /></ListItem></NavLink>
        </List>
    )

    return (
        <ul>
            <NavigationItem link='/add-interest'>Em comprar</NavigationItem>
            <NavigationItem link='/keys'>Chaves</NavigationItem>
            {!props.isAuth
                ?
                <NavigationItem link='/authenticate'>Entrar</NavigationItem>
                :
                accountDropDown
            }
        </ul>
    )
}

export default navigationItems;