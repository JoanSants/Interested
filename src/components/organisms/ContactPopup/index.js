import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import HeadingPrimary from '../../atoms/Headers/HeadingPrimary';
import Button from '../../atoms/Buttons/Button';
import styles from './styles.module.css';

class InterestPopUp extends Component {

  state = {
    opened: false,
    contactId: null
  }

  TogglePopupHandler() {
    this.setState({ opened: !this.state.opened });
  }

  ContactHandler(id) {
    this.setState({ contactId: id })
  }

  render() {
    if (this.props.contactInfo !== null && this.props.contactInfo._id !== this.state.contactId) {
      this.TogglePopupHandler();
      this.ContactHandler(this.props.contactInfo._id);
    }

    let classes = [styles.InterestPopupBack];
    if (this.state.opened) {
      classes.push(styles.InterestPopupOpenedBack);
    }


    let contact = null;
    if (this.props.contactInfo !== null) {
      contact = (
        <div className={classes.join(" ")} >
          <div className={styles.MainPopupContent}>
            <button className={styles.MainPopupCloseButton} onClick={() => { this.TogglePopupHandler() }}>X</button>
            <HeadingPrimary>{this.props.contactInfo.fullName}</HeadingPrimary>
            <p>telefone: {this.props.contactInfo.telephone}</p>
            <p>celular: {this.props.contactInfo.cellphone}</p>
            <p>email: {this.props.contactInfo.email}</p>
            <p>Whatsapp</p>
            {this.props.contactInfo.useWhatsapp ? <a href={'https://api.whatsapp.com/send?phone=55' + this.props.contactInfo.cellphone + '&text=Ol%C3%A1,%20estou%20com%20d%C3%BAvida,%20pode%20me%20ajudar?'} target='_blank' rel="noopener noreferrer"><Button>CONVERSAR</Button></a> : 'Não utiliza'}
          </div>
        </div>
      )
    }

    return (
      <Fragment>
        {contact}
      </Fragment>
    )
  }
}

const MapStateToProps = state => {
  return {
    user: state.auth.user,
    interests: state.interest.interests
  }
}
export default connect(MapStateToProps)(InterestPopUp);