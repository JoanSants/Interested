import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Contact from '../../molecules/Contact';
import axios from '../../../axios';
import ContactPopup from '../ContactPopup';
import HeadingPrimary from '../../atoms/Headers/HeadingPrimary';
import styles from './styles.module.css';

class Contacts extends Component {

    
    state = {
        userContact: null,
        error: null
    }

    showContactHandler = () => {
        this.setState({ modalClosed: !this.state.modalClosed })
    }

    //Obter os próprios contatos com autenticação
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
                return <Contact
                    key={contact._id}
                    id={contact._id}
                    name={contact.name}
                    fetchConcact={(id) => { this.fetchContact(id) }}
                />
            })
        }

        let userContact = null;
        if (this.state.userContact) {
            userContact = <ContactPopup contactInfo={this.state.userContact}/>
        }

        return (
        <Fragment>
            <HeadingPrimary>Meus contatos</HeadingPrimary>
            <section className={styles.ContactsSection}>
                {userContact}
                {contacts}
            </section>
        </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        contacts: state.auth.user.contacts,
        token: state.auth.token
    }
}

export default connect(mapStateToProps, null)(Contacts);