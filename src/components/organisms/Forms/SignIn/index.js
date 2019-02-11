import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { checkValidity, updateObject } from '../../../../shared/utility';
import Email from '../../../molecules/Fields/EmailField';
import Password from '../../../molecules/Fields/PasswordField';
import Spinner from '../../../atoms/Spinner';
import * as actions from '../../../../store/actions';
import HeadingPrimary from '../../../atoms/Headers/HeadingPrimary';
import Button from '../../../atoms/Buttons/Button';
import styles from '../styles.module.css';

class SignIn extends Component {
    state = {
        formControls: {
            email: {
                placeholder: 'Informe seu e-mail',
                label: 'E-mail',
                value: '',
                validation: {
                    isRequired: true,
                    isEmail: true
                },
                validationMessage: 'Informe um e-mail válido',
                isValid: false,
                wasTouched: false
            },
            password: {
                placeholder: 'Insira sua senha',
                label: 'Senha',
                value: '',
                validation: {
                    isRequired: true,
                    minLength: 6
                },
                validationMessage: 'A senha deve conter ao menos 6 dígitos',
                isValid: false,
                wasTouched: false
            }
        },
        isFormValid: false,
        SignInRequested: false
    }

    switchAuthModeHandler = (event) => {
        event.preventDefault();
        this.props.history.push(this.props.match.path + 'signup');
    }

    signInDataHandler = (event) => {
        event.preventDefault();

        const formData = {};
        for (let formElementIdentifier in this.state.formControls) {
            formData[formElementIdentifier] = this.state.formControls[formElementIdentifier].value;
        }
        const signInData = formData;

        this.props.onSignIn(signInData, false);
        this.setState({ SignInRequested: true });
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedFormElement = updateObject(this.state.formControls[inputIdentifier], {
            value: event.target.value,
            isValid: checkValidity(event.target.value, this.state.formControls[inputIdentifier].validation),
            wasTouched: true
        });
        const updatedFormControls = updateObject(this.state.formControls, {
            [inputIdentifier]: updatedFormElement
        });

        let isFormValid = true;
        for (let inputIdentifier in updatedFormControls) {
            isFormValid = updatedFormControls[inputIdentifier].isValid && isFormValid;
        }
        this.setState({ formControls: updatedFormControls, isFormValid: isFormValid });
    }

    render() {

        let form = (
            <form className={styles.DefaultForm}>
                <HeadingPrimary>Insira os dados para Login</HeadingPrimary>
                {this.props.error ? <span>{this.props.error}</span> : null}

                <Email
                    label={this.state.formControls.email.label}
                    placeholder={this.state.formControls.email.placeholder}
                    validationMessage={this.state.formControls.email.validationMessage}
                    value={this.state.formControls.email.value}
                    onChange={(event) => this.inputChangedHandler(event, 'email')}
                    touched={this.state.formControls.email.wasTouched}
                    valid={this.state.formControls.email.isValid}
                />

                <Password
                    label={this.state.formControls.password.label}
                    placeholder={this.state.formControls.password.placeholder}
                    validationMessage={this.state.formControls.password.validationMessage}
                    value={this.state.formControls.password.value}
                    onChange={(event) => this.inputChangedHandler(event, 'password')}
                    touched={this.state.formControls.password.wasTouched}
                    valid={this.state.formControls.password.isValid}
                />
                <div className={styles.DefaultFormButtonBox}>
                    <Button
                        disabled={!this.state.isFormValid}
                        onClick={this.state.isFormValid ? this.signInDataHandler : null}>
                        ENVIAR
                </Button>

                    <Button
                        onClick={this.switchAuthModeHandler}>
                        Cadastrar
                </Button>
                </div>
            </form>
        );

        if (this.props.loading) {
            form = <Spinner />;
        }

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to='/' />
        }

        return (
                <div className={styles.DefaultFormBox}>
                    {authRedirect}
                    {form}
                </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null
    };
};

//separar 
const mapDispatchToProps = dispatch => {
    return {
        onSignIn: (signInData, isSignUp) => dispatch(actions.auth(signInData, isSignUp))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);