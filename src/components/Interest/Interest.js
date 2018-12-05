import React, { Component } from 'react';
import { Card, Button } from 'react-materialize';
import styles from './interest.module.css';
import Modal from '../UI/Modal/Modal';
import Aux from '../../hoc/Auxiliary/Auxiliary';

class Interest extends Component {

    state = {
        modalClosed: false
    }

    showDetailsHandler = () => {
        this.setState({ modalClosed: !this.state.modalClosed })
    }

    render() {
        return (
            <Aux>
                <Modal
                    show={this.state.modalClosed}
                    modalClosed={this.showDetailsHandler}>
                    <h1>{this.props.name}</h1>
                    <p>Detalhes: {this.props.description}</p>
                    <p>Preço:   {this.props.price}</p>
                </Modal>
                <Card className={styles.Card} title={this.props.name} actions={[<Button key={this.props.id + 1} onClick={this.showDetailsHandler}>detalhes</Button>, <Button key={this.props.id + 2} onClick={() => {this.props.postContactHandler(this.props.id)}}>contato</Button>]}>
                    Preço: {this.props.price},00
                </Card>
            </Aux>

        )
    }
}

export default Interest;