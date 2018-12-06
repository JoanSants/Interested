import React, { Component } from 'react';
import { Card, Button } from 'react-materialize';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import styles from './interest.module.css';
import Modal from '../UI/Modal/Modal';
import Aux from '../../hoc/Auxiliary/Auxiliary';

class Interest extends Component {

    state = {
        modalDetails: false,
        modalContact: false,
        selectedContact: null
    }

    showDetailsHandler = () => {
        this.setState({ modalDetails: !this.state.modalDetails })
    }

    showContactHandler = (id) => {
        this.setState({ modalContact: !this.state.modalContact, selectedContact: id})
    }

    render() {
        return (
            <Aux>
                <Modal show={this.state.modalDetails} modalClosed={this.showDetailsHandler}>
                    <h1>{this.props.name}</h1>
                    <p>Detalhes: {this.props.description}</p>
                    <p>Preço:   {this.props.price}</p>
                </Modal>
                <Modal show={this.state.modalContact} modalClosed={this.showContactHandler}>
                    <h1>{this.props.name}</h1>
                    <p>{this.props.error ? this.props.error : null }</p>
                    {this.props.isAuthenticated 
                    ?
                    <Button onClick={(id) => {this.props.postContactHandler(this.state.selectedContact)}}>Obter Contato</Button>
                    :
                    <NavLink to={'/authenticate'}><Button >Realizar Login</Button></NavLink>
                 }
                </Modal>
                <Card 
                    className={styles.Card} 
                    title={this.props.name} 
                    actions={[    
                        <Button 
                            key={this.props.id + 1} 
                            onClick={this.showDetailsHandler}>detalhes</Button>, 
                        !this.props.myInterest 
                        ? 
                        <Button 
                            key={this.props.id + 2} 
                            onClick={() => this.showContactHandler(this.props.id)}>contato</Button>
                        :
                        null
                    ]}>
                    Preço: {this.props.price},00
                </Card>
            </Aux>

        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps, null)(Interest);