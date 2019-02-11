import React, { Component } from 'react';
import axios from '../../../axios';
import { connect } from 'react-redux';

import Coin from '../../molecules/Coin';
import styles from './styles.module.css';
import HeadingPrimary from '../../atoms/Headers/HeadingPrimary';

class Coins extends Component {

    state = {
        keys: null,
        error: null
    }
    
    //Obter Chaves
    componentDidMount() {
        axios.get('/keys').then(response => {
            this.setState({ keys: response.data.keys });
        }).catch(err => {
            this.setState({ error: err });
        });
    }

    //Obter Chaves com Autenticação e alterar as chaves do usuário
    keyBoughtHandler = (id) => {
        const body = { "key": id }
        axios.post('/keys/buy', body, {
            headers: {
                "x-auth": this.props.token
            }
        }).then(response => {
            this.props.onFetchUser(this.props.token);
        }).catch(err => {
            this.setState({ error: err.response.data.message });
        })
    }

    render() {
        let keys = null;
        if (this.state.keys) {
            keys = this.state.keys.map(key => {
                return <Coin
                    key={key._id}
                    id={key._id}
                    name={key.name}
                    description={key.description}
                    price={key.price}
                    quantity={key.quantity}
                    buyKey={(id) => { this.keyBoughtHandler(id) }}
                    isAuth={this.props.isAuthenticated}
                />
            });

            if (keys.length === 0) {
                keys = <h5>Não possuímos chaves no momento, tente novamente mais tarde.</h5>
            }
        }
        
        return (
            <section className={styles.CoinsSection}>
                {this.state.error ? <p>this.state.error</p> : null}
                <HeadingPrimary>Coins</HeadingPrimary>
                <div className={styles.CoinsBox}>
                    {keys}
                </div>
            </section>
        )
    }

}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        user: state.auth.user,
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Coins);