import React, { Component } from 'react';
import { connect } from 'react-redux';
import Categories from '../Categories';
import Logo from '../../atoms/Logo';
import styles from './index.module.css';
import MyCoins from '../../atoms/MyCoins';

class Navbar extends Component {
    render() {
        let classes = [this.props.gridClass];
        classes.push(styles.NavBar);

        let coins = null;

        if(this.props.isAuthenticated){
            if(this.props.myCoins !== null){
                coins = <MyCoins coins={this.props.myCoins.keys}/>
            }
        }

        return (
            <header className={classes.join(" ")}>
                <Logo />
                <Categories />
                {coins}
            </header>
        )
    }
}

const MapStateToProps = state => {
    return {
        myCoins: state.auth.user,
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(MapStateToProps)(Navbar);
