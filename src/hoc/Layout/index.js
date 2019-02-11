import React, {Component} from 'react';
import {connect} from 'react-redux';

import NavBar from '../../components/organisms/Navbar';
import SideDrawer from '../../components/organisms/SideDrawer';
import styles from './styles.module.css';

class Layout extends Component {
  render(){
    return (
      <div className={styles.Container}>
        <NavBar gridClass={styles.Nav}/>
        <SideDrawer isAuthenticated={this.props.isAuthenticated} gridClass={styles.SideNav}/>
        <main className={styles.Main}>
          {this.props.children}
        </main>
      </div>
    )
  } 
}

const MapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default connect(MapStateToProps)(Layout);