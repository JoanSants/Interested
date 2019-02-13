import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import SideDrawerItem from '../../atoms/SideDrawerItem';
import styles from './index.module.css';

const sideDrawerItems = ({ isAuthenticated }) => {

    return (
        <ul className={styles.SideDrawerItems}>
            <SideDrawerItem link='/add-interest'>
                <i className="material-icons md-light">add</i>
                <span>Post</span>
            </SideDrawerItem>
            <SideDrawerItem link='/my-coins'>
                <i className="material-icons md-light">panorama_fish_eye</i>
                <span>Coins</span>
            </SideDrawerItem>
            {!isAuthenticated
                ?
                <SideDrawerItem link='/authenticate'>
                    <i className="material-icons md-light">games</i>
                    <span>Entrar</span>
                </SideDrawerItem>
                :
                <Fragment>
                    <SideDrawerItem link='/my-interests'>
                        <i className="material-icons md-light">favorite</i>
                        <span>Interesses</span>
                    </SideDrawerItem>
                    <SideDrawerItem link='/my-contacts'>
                        <i className="material-icons md-light">account_box</i>
                        <span>Contatos</span>
                    </SideDrawerItem>
                    <SideDrawerItem link='/my-info'>
                        <i className="material-icons md-light">edit</i>
                        <span>Contato</span>
                    </SideDrawerItem>
                    <SideDrawerItem link='/logout'>
                        <i className="material-icons md-light">exit_to_app</i>
                        <span>Sair</span>
                    </SideDrawerItem>
                </Fragment>
            }
        </ul>
    )
}

sideDrawerItems.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
}

export default sideDrawerItems;