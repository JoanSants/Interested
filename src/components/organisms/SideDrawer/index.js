import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.css';

import SideDrawerItems from '../../molecules/SideDrawerItems';
import Copy from '../../atoms/Copyright';

const sideDrawer = props => {
  const sideList = <SideDrawerItems isAuthenticated={props.isAuthenticated} />;
  const classes = [props.gridClass];
  classes.push(styles.SideNav);

  return (
    <nav className={classes.join(" ")}>
      {sideList}
      <Copy/>
    </nav>
  )
}

sideDrawer.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
}

export default sideDrawer;
