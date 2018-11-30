import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../Auxiliary/Auxiliary';
import Navbar from '../../components/Navigation/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import styles from './Layout.module.css';

class Layout extends Component {

    render() {
        return (
            <Aux>
                <Navbar isAuthenticated={this.props.isAuthenticated}/>
                <main className={styles.Content}>
                    {this.props.children}
                </main>
                <Footer />
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated:state.auth.token !== null
    }
}
export default connect(mapStateToProps, null)(Layout);