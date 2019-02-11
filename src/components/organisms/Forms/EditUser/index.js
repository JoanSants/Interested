import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../../../../store/actions/index';
import axios from '../../../../axios';
import { checkValidity, updateObject } from '../../../../shared/utility';

import Spinner from '../../../atoms/Spinner';
import Text from '../../../molecules/Fields/TextField';
import Select from '../../../molecules/Fields/SelectField';
import HeadingPrimary from '../../../atoms/Headers/HeadingPrimary';
import Button from '../../../atoms/Buttons/Button';
import styles from '../styles.module.css';

class EditUserForm extends Component {
  state = {
    editControls: {
      fullName: {
        placeholder: 'Informe seu nome completo',
        label: 'Nome Completo',
        value: '',
        validation: {
          isRequired: true,
          minLength: 8
        },
        validationMessage: 'Informe seu nome completo',
        isValid: false,
        wasTouched: false
      },
      telephone: {
        placeholder: 'Informe seu telefone',
        label: 'Telefone',
        value: '',
        validation: {
          isRequired: true,
          isNumeric: true,
          minLength: 10,
          maxLength: 10
        },
        validationMessage: 'Informe um telefone válido (11 5555-5555)',
        isValid: false,
        wasTouched: false
      },
      cellphone: {
        placeholder: 'Informe seu celular',
        label: 'Celular',
        value: '',
        validation: {
          isRequired: true,
          isNumeric: true,
          minLength: 13,
          maxLength: 13
        },
        validationMessage: 'Informe um celular válido (55 11 99999-9999)',
        isValid: false,
        wasTouched: false
      },
      useWhatsapp: {
        label: 'Utilizar Whatsapp',
        value: 'true',
        options: [
          { value: 'true', displayValue: 'Utilizar Whatsapp' },
          { value: 'false', displayValue: 'Não Utilizar Whatsapp' }
        ],
        validationMessage: 'Selecione uma das opções',
        isValid: true
      }
    },
    formIsValid: false,
  }

  //Alterar os dados do usuário inclusive no state principal
  editDataHandler = (event) => {
    event.preventDefault();

    const formData = {};
    for (let formElementIdentifier in this.state.editControls) {
      formData[formElementIdentifier] = this.state.editControls[formElementIdentifier].value;
    }
    const editData = formData;

    axios.patch('/users', editData, {
      headers: {
        "x-auth": this.props.token
      }
    }).then(response => {
      this.setState({ error: 'Dados alterados' })
    })
  }

  inputChangedHandler = (event, inputIdentifier) => {

    const controls = this.state.editControls;
    const updatedFormElement = updateObject(controls[inputIdentifier], {
      value: event.target.value,
      isValid: checkValidity(event.target.value, controls[inputIdentifier].validation),
      wasTouched: true
    });

    const updatedControls = updateObject(controls, {
      [inputIdentifier]: updatedFormElement
    });

    let formIsValid = true;
    for (let inputIdentifier in updatedControls) {
      formIsValid = updatedControls[inputIdentifier].isValid && formIsValid;
    }
    this.setState({ editControls: updatedControls, formIsValid: formIsValid });
  }

  render() {

    let form = (
      <form className={styles.DefaultForm}>
        <HeadingPrimary>Alterar dados de cadastro</HeadingPrimary>
        {this.state.error ? <span>{this.state.error}</span> : null}

        <Text
          label={this.state.editControls.fullName.label}
          placeholder={this.state.editControls.fullName.placeholder}
          validationMessage={this.state.editControls.fullName.validationMessage}
          value={this.state.editControls.fullName.value}
          onChange={(event) => this.inputChangedHandler(event, 'fullName')}
          touched={this.state.editControls.fullName.wasTouched}
          valid={this.state.editControls.fullName.isValid}
        />

        <Text
          label={this.state.editControls.telephone.label}
          placeholder={this.state.editControls.telephone.placeholder}
          validationMessage={this.state.editControls.telephone.validationMessage}
          value={this.state.editControls.telephone.value}
          onChange={(event) => this.inputChangedHandler(event, 'telephone')}
          touched={this.state.editControls.telephone.wasTouched}
          valid={this.state.editControls.telephone.isValid}
        />

        <Text
          label={this.state.editControls.cellphone.label}
          placeholder={this.state.editControls.cellphone.placeholder}
          validationMessage={this.state.editControls.cellphone.validationMessage}
          value={this.state.editControls.cellphone.value}
          onChange={(event) => this.inputChangedHandler(event, 'cellphone')}
          touched={this.state.editControls.cellphone.wasTouched}
          valid={this.state.editControls.cellphone.isValid}
        />

        <Select
          label={this.state.editControls.useWhatsapp.label}
          options={this.state.editControls.useWhatsapp.options}
          value={this.state.editControls.useWhatsapp.value}
          onChange={(event) => this.inputChangedHandler(event, 'useWhatsapp')}
        />


        <Button
          disabled={!this.state.formIsValid}
          onClick={this.state.formIsValid ? this.editDataHandler : null}>
          ENVIAR
        </Button>
      </form>
    );

    if (this.props.loading) {
      form = <Spinner />;
    }

    let isAuthenticated = null;

    if (!this.props.isAuthenticated) {
      isAuthenticated = <Redirect to='/authenticate' />
    }


    return (
      <div className={styles.DefaultFormBox}>
        {isAuthenticated}
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    token: state.auth.token
  };
};

//Separar SignUp e SignIn
const mapDispatchToProps = dispatch => {
  return {
    onSignUp: (signUpData, isSignup) => dispatch(actions.auth(signUpData, isSignup)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUserForm);