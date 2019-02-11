//Obter Contato com Autenticação

import axios from '../../axios';
import * as actionTypes from './actionTypes';

export const unlockContactStart = () => {
  return {
    type: actionTypes.UNLOCK_CONTACT_USER_START
  };
};

export const unlockContactSuccess = () => {
  return {
    type: actionTypes.UNLOCK_CONTACT_USER_SUCCESS
  };
};

export const unlockContactFail = (error) => {
  return {
    type: actionTypes.UNLOCK_CONTACT_USER_FAIL,
    error: error
  };
};

export const unlockContact = (id) => {
  return dispatch => {
    dispatch(unlockContactStart());
    const body = {
      _interest: id
    }
    axios.post('/users/contact', body, {
      headers: {
        "x-auth": this.props.token
      }
    }).then(() => {
      return dispatch(unlockContactSuccess());
    }).catch(err => {
      this.setState({ error: err.response.data.error.message })
    })
  };
};

//FETCH CONTACT ALREADY BOUGHT

export const fetchContactStart = () => {
  return {
    type: actionTypes.FETCH_CONTACT_USER_START
  };
};

export const fetchContactSuccess = () => {
  return {
    type: actionTypes.FETCH_CONTACT_USER_SUCCESS
  };
};

export const fetchContactFail = (error) => {
  return {
    type: actionTypes.FETCH_CONTACT_USER_FAIL,
    error: error
  };
};

export const fetchContact = (id, token) => {
  return dispatch => {
    dispatch(fetchContactStart());
    axios.get('users/contact/' + id, {
      headers: {
        "x-auth": token
      }
    }).then(response => {
      return response.data.userContact;
    }).catch(error => {
      this.setState({ error: error });
    })
  };
};