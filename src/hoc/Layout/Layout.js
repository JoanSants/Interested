import React, {Component} from 'react';

import Aux from '../Auxiliary/Auxiliary';
import Navbar from '../../components/Navigation/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import styles from './Layout.module.css';

class Layout extends Component {

    render(){
        return (
            <Aux> 
                <Navbar/>
                <main className={styles.Content}>
                    {this.props.children}
                </main>
                <Footer/>
            </Aux>
        )
    }
}

export default Layout;