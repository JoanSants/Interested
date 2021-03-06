import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import axios from '../../../axios';
import { Redirect, NavLink } from 'react-router-dom';
import * as actions from '../../../store/actions';

import HeadingSecondary from '../../atoms/Headers/HeadingSecondary';
import Button from '../../atoms/Buttons/Button';
import styles from './styles.module.css';

class InterestPopUp extends Component {

  state = {
    opened: false,
    interestId: null,
    redirect: false,
    userContact: null
  }

  OpenPopupHandler() {
    this.setState({ opened: true });
  }

  ClosePopupHandler() {
    this.setState({ opened: false});
  }

  InterestIdHandler(id) {
    this.setState({ interestId: id });
  }

  FetchContact = (id) => {
    axios.get('users/contact/' + id, {
      headers: {
        "x-auth": this.props.token
      }
    }).then(response => {
      this.setState({ userContact: response.data.userContact });
    }).catch(error => {
      this.setState({ error: error });
    })
  }

  PostContactHandler(id) {
    const body = {
      _interest: id
    }
    axios.post('/users/contact', body, {
      headers: {
        "x-auth": this.props.token
      }
    }).then(response => {
      this.props.onFetchUser(this.props.token);
      this.setState({ userContact: response.data.user });
    }).catch(err => {
      this.setState({ error: err.response.data.error.message })
    })
  }

  RedirectLogin() {
    return this.setState({ redirect: true });
  }

  ResetPopup(){
    this.setState({interestId: null, userContact: null});
  }


  render() {
    if (this.props.id !== null && this.props.id !== this.state.interestId) {
      this.OpenPopupHandler();
      this.ResetPopup();
      this.InterestIdHandler(this.props.id)
    }

    let classes = [styles.InterestPopupBack];
    if (this.state.opened) {
      classes.push(styles.InterestPopupOpenedBack);
    }


    let interest = null;
    if (this.props.interests !== null) {
      interest = this.props.interests.filter(interest => interest._id === this.state.interestId);
      if (interest.length > 0) {
        interest = (
          <div className={styles.InterestBox}>
            <div className={styles.InterestInfo}>
              <HeadingSecondary>{interest[0].name}</HeadingSecondary>
              <p>{interest[0].description}</p>
              <p>R${interest[0].price},00</p>
            </div>
          </div>
        )
      }
    }

    let contactInfo = null;
    if (this.state.userContact) {
      contactInfo = (
        <Fragment>
          <HeadingSecondary>{this.state.userContact.fullName}</HeadingSecondary>
            <p>telefone: {this.state.userContact.telephone}</p>
            <p>celular: {this.state.userContact.cellphone}</p>
            <p>email: {this.state.userContact.email}</p>
            <p>Whatsapp</p>
            {this.state.userContact.useWhatsapp ? <a href={'https://api.whatsapp.com/send?phone=55' + this.state.userContact.cellphone + '&text=Ol%C3%A1,%20estou%20com%20d%C3%BAvida,%20pode%20me%20ajudar?'} target='_blank' rel="noopener noreferrer"><Button>CONVERSAR</Button></a> : 'Não utiliza'}
        </Fragment>
      )
    } else {
      if (this.props.isAuthenticated) {
        if (this.props.user !== null) {
          contactInfo = this.props.user.contacts.filter(contact => contact._id === this.state.interestId);
          if (contactInfo.length > 0) {
            contactInfo = <Button onClick={(id) => { this.FetchContact(this.state.interestId) }}>Ver Contato</Button>
          } else {
            if(this.props.user.keys < 1){
              contactInfo = <NavLink to="/keys"><Button>Comprar chaves</Button></NavLink>
            }

            contactInfo = <Button onClick={(id) => { this.PostContactHandler(this.state.interestId) }}>Obter Contato</Button>
          }
        }
      } else {
        contactInfo = <Button onClick={() => { this.RedirectLogin() }}>Realizar login</Button>
      }
    }

    let redirect = null;
    if (this.state.redirect) {
      redirect = <Redirect to="/authenticate" />
    }

    return (
      <div className={classes.join(" ")}>
        {redirect}
        <div className={styles.MainPopupContent}>
          <button className={styles.MainPopupCloseButton} onClick={() => { this.ClosePopupHandler() }}>X</button>
          <div className={styles.MainPopupInterest}>
            {interest}
          </div>
          <div className={styles.MainPopupContact}>
            <div className={styles.ContactBox}>
              <HeadingSecondary>Contato</HeadingSecondary>
              {contactInfo}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const MapStateToProps = state => {
  return {
    user: state.auth.user,
    isAuthenticated: state.auth.token !== null,
    token: state.auth.token,
    interests: state.interest.interests
  }
}

const MapActionsToProps = dispatch => {
  return {
    onFetchUser: (token) => dispatch(actions.fetchUserData(token))
  }
}
export default connect(MapStateToProps, MapActionsToProps)(InterestPopUp);