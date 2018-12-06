import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import { connect } from 'react-redux';

import NavigationIntems from '../NavigationItems/NavigationItems';

const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
};

class SideDrawer extends React.Component {

  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>
          <NavigationIntems isAuth={this.props.isAuthenticated}/>
        </List>
      </div>
    );

    return (
      <div>
        <Drawer open={this.props.open} onClose={this.props.closed}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.props.closed}
            onKeyDown={this.props.closed}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default connect(mapStateToProps, null)(withStyles(styles)(SideDrawer));
