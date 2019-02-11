import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Spinner from '../../../atoms/Spinner';
import Text from '../../../molecules/Fields/TextField'
import Select from '../../../molecules/Fields/SelectField'
import HeadingPrimary from '../../../atoms/Headers/HeadingPrimary';
import Button from '../../../atoms/Buttons/Button';
import { checkValidity, updateObject } from '../../../../shared/utility';
import axios from '../../../../axios';
import withErrorHandler from '../../../../hoc/withErrorHandler';
import styles from '../styles.module.css';

import * as actions from '../../../../store/actions';

class FormAddInterest extends Component {

  componentDidMount() {
    let options = [];
    if (this.props.categories !== null) {
      this.props.categories.map(category => {
        return options.push({ value: category._id, displayValue: category.name });
      });

      const updatedformControls = {
        ...this.state.formControls,
        _category: {
          ...this.state.formControls._category,
          options
          ,
          value: options[0]
        }
      };
      this.setState({ formControls: updatedformControls });
    }
  }

  state = {
    formControls: {
      name: {
        placeholder: 'Nome',
        label: 'Nome',
        value: '',
        validation: {
          isRequired: true,
          minLength: 5
        },
        validationMessage: 'O nome deve conter ao menos 5 caracteres',
        isValid: false,
        wasTouched: false
      },
      description: {
        placeholder: 'Descrição',
        label: 'Descrição',
        value: '',
        validation: {
          isRequired: true,
          minLength: 50,
          maxLength: 200
        },
        validationMessage: 'A descrição deve conter entre 50 e 200 caracteres',
        isValid: false,
        wasTouched: false
      },
      price: {
        placeholder: 'Valor desejado',
        label: 'Valor desejado',
        value: '',
        validation: {
          isRequired: true,
          minLength: 2,
        },
        validationMessage: 'Insira um valor válido',
        isValid: false,
        wasTouched: false
      },
      urlImage: {
        placeholder: 'URL da Imagem',
        label: 'URL da Imagem',
        value: '',
        validation: {
          isRequired: true,
          minLength: 5
        },
        validationMessage: 'Insira uma URL válida',
        isValid: false,
        wasTouched: false
      },
      _category: {
        label: 'Categoria',
        value: 'consoles',
        options: [
        ],
        isValid: true
      }
    },
    isFormValid: false,
    userMessage: null
  }

  //Inserir interesse com autenticação os interesses devem ser alterados no usuário e interesses.
  addInterestHandler = (event) => {
    event.preventDefault();

    const interest = {};
    for (let formElementIdentifier in this.state.formControls) {
      interest[formElementIdentifier] = this.state.formControls[formElementIdentifier].value;
    }

    axios.post('/interests', interest, {
      headers: {
        "x-auth": this.props.token
      }
    }).then((response) => {
      this.setState({ userMessage: 'Interesse adicionado' });
      this.props.onFetchUserData(this.props.token);
    }).catch(err => {
      this.setState({ userMessage: err.response.data.error.message });
    });

  }

  inputChangedHandler = (event, inputIdentifier) => {

    const controls = this.state.formControls;
    const updatedFormElement = updateObject(controls[inputIdentifier], {
      value: event.target.value,
      isValid: checkValidity(event.target.value, controls[inputIdentifier].validation),
      wasTouched: true
    });

    const updatedControls = updateObject(controls, {
      [inputIdentifier]: updatedFormElement
    });

    let isFormValid = true;
    for (let inputIdentifier in updatedControls) {
      isFormValid = updatedControls[inputIdentifier].isValid && isFormValid;
    }
    this.setState({ formControls: updatedControls, isFormValid: isFormValid });
  }

  render() {

    let form = (
      <form onSubmit={this.addInterestHandler} className={styles.DefaultForm}>
        <HeadingPrimary>O que deseja comprar?</HeadingPrimary>

        {this.state.userMessage
          ?
          this.state.userMessage
          :
          null
        }

        <Text
          label={this.state.formControls.name.label}
          placeholder={this.state.formControls.name.placeholder}
          validationMessage={this.state.formControls.name.validationMessage}
          value={this.state.formControls.name.value}
          onChange={(event) => this.inputChangedHandler(event, 'name')}
          touched={this.state.formControls.name.wasTouched}
          valid={this.state.formControls.name.isValid}
        />

        <Text
          label={this.state.formControls.description.label}
          placeholder={this.state.formControls.description.placeholder}
          validationMessage={this.state.formControls.description.validationMessage}
          value={this.state.formControls.description.value}
          onChange={(event) => this.inputChangedHandler(event, 'description')}
          touched={this.state.formControls.description.wasTouched}
          valid={this.state.formControls.description.isValid}
        />

        <Text
          label={this.state.formControls.price.label}
          placeholder={this.state.formControls.price.placeholder}
          validationMessage={this.state.formControls.price.validationMessage}
          value={this.state.formControls.price.value}
          onChange={(event) => this.inputChangedHandler(event, 'price')}
          touched={this.state.formControls.price.wasTouched}
          valid={this.state.formControls.price.isValid}
        />

        <Text
          label={this.state.formControls.urlImage.label}
          placeholder={this.state.formControls.urlImage.placeholder}
          validationMessage={this.state.formControls.urlImage.validationMessage}
          value={this.state.formControls.urlImage.value}
          onChange={(event) => this.inputChangedHandler(event, 'urlImage')}
          touched={this.state.formControls.urlImage.wasTouched}
          valid={this.state.formControls.urlImage.isValid}
        />

        <Select
          label={this.state.formControls._category.label}
          options={this.state.formControls._category.options}
          value={this.state.formControls._category.value}
          onChange={(event) => this.inputChangedHandler(event, '_category')}
        />


        <Button disabled={!this.state.isFormValid} clicked={this.addInterestHandler}>Adicionar Interesse</Button>
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
      </div>);
  }


}

const mapActionsToProps = dispatch => {
  return {
    onFetchUserData: (token) => { dispatch(actions.fetchUserData(token)) }
  }
}

const mapStateToProps = state => {
  return {
    loading: state.interest.loading,
    token: state.auth.token,
    isAuthenticated: state.auth.token !== null,
    categories: state.category.categories
  }
}

export default connect(mapStateToProps, mapActionsToProps)(withErrorHandler((FormAddInterest), axios));