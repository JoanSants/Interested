import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-materialize';
import { Redirect } from 'react-router-dom';

import { checkValidity, updateObject } from '../../../shared/utility';
import Input from '../../../components/UI/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner';
import * as actions from '../../../store/actions';
import styles from './SignIn.module.css';

class SignIn extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'E-mail'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false,
        SignInRequested: false
    }

    switchAuthModeHandler = (event) => {
        event.preventDefault();
        this.props.history.push(this.props.match.path + 'signup');
    }

    signInDataHandler = (event) => {
        event.preventDefault();

        const formData = {};
        for (let formElementIdentifier in this.state.controls) {
            formData[formElementIdentifier] = this.state.controls[formElementIdentifier].value;
        }
        const signInData = formData;

        this.props.onSignIn(signInData, false);
        this.setState({SignInRequested: true});
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedFormElement = updateObject(this.state.controls[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.controls[inputIdentifier].validation),
            touched: true
        });
        const updatedControls = updateObject(this.state.controls, {
            [inputIdentifier]: updatedFormElement
        });

        let formIsValid = true;
        for (let inputIdentifier in updatedControls) {
            formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
        }
        this.setState({ controls: updatedControls, formIsValid: formIsValid });
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = (
            <form onSubmit={this.signInDataHandler}>
                {formElementsArray.map(formElement => {
                    return <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                })}
                <Button disabled={!this.state.formIsValid}>ENVIAR</Button>
                <Button onClick={this.switchAuthModeHandler}>Cadastrar</Button>
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
            <div className={styles.ContactData}>
                {this.props.error ? this.props.error : null}
                {authRedirect}
                <h4>Insira os dados para Login</h4>
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

const mapDispatchToProps = dispatch => {
    return {
        onSignIn: (signInData, isSignUp) => dispatch(actions.auth(signInData, isSignUp))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);