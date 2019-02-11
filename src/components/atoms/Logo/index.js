import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './styles.module.css';

const Logo = props => {
  return <NavLink className={styles.Logo} to='/' >Interessados</NavLink>
}

export default Logo;