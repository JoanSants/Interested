import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import ContactFragment from '../../components/Contact/Contact';
import axios from '../../axios';
import Modal from '../../components/UI/Modal/Modal';
import Button from '@material-ui/core/Button';

class Contact extends Component {

    state = {
        userContact: null,
        error: null,
        modalClosed: false
    }

    showContactHandler = () => {
        this.setState({ modalClosed: !this.state.modalClosed })
    }

    fetchContact = (id) => {
        axios.get('users/contact/' + id, {
            headers: {
                "x-auth": this.props.token
            }
        }).then(response => {
            this.showContactHandler();
            this.setState({ userContact: response.data.userContact });
        }).catch(error => {
            this.setState({ error: error });
        })
    }

    render() {
        let contacts = null;
        if (this.props.contacts) {
            contacts = this.props.contacts.map(contact => {
                return <ContactFragment
                    key={contact._id}
                    id={contact._id}
                    name={contact.name}
                    fetchConcact={(id) => { this.fetchContact(id) }}
                />
            })
        }

        let modal = null;
        if (this.state.userContact) {
            modal = <Modal
                show={this.state.modalClosed}
                modalClosed={this.showContactHandler}>
                <h1>{this.state.userContact.fullName}</h1>
                <p>telefone: {this.state.userContact.telephone}</p>
                <p>celular: {this.state.userContact.cellphone}</p>
                <p>Whatsapp: {this.state.userContact.useWhatsapp ? <a href='https://api.whatsapp.com/send?phone=55119999988888&text=Ol%C3%A1,%20estou%20com%20d%C3%BAvida,%20pode%20me%20ajudar?' target='_blank'><Button>CONVERSAR</Button></a> : 'Não utiliza'}</p>
            </Modal>
        }
        return (
            <Aux>
                {modal}
                {contacts}
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        contacts: state.auth.user.contacts,
        token: state.auth.token
    }
}

export default connect(mapStateToProps, null)(Contact);