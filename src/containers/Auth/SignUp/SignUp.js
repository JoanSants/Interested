import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-materialize';

import Input from '../../../components/UI/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner';
import styles from './SignUp.module.css';
import * as actions from '../../../store/actions';
import { checkValidity, updateObject } from '../../../shared/utility';
import axios from '../../../axios';

class SignUp extends Component {
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
            }, fullName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Nome completo'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }, cpf: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'CPF'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 11,
                    maxLength: 11,
                    isNumeric: true
                },
                valid: false,
                touched: false
            }, telephone: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Telefone'
                },
                value: '',
                validation: {
                    required: true,
                    isNumeric: true,
                    minLength: 10,
                    maxLength: 10
                },
                valid: false,
                touched: false
            }, cellphone: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Celular'
                },
                value: '',
                validation: {
                    required: true,
                    isNumeric: true,
                    minLength: 11,
                    maxLength: 11
                },
                valid: false,
                touched: false
            }, useWhatsapp: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'true', displayValue: 'Utilizar Whatsapp' },
                        { value: 'false', displayValue: 'Não Utilizar Whatsapp' }
                    ]
                },
                value: 'true',
                validation: {},
                valid: true
            }
        }, editControls: {
            fullName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Nome completo'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }, telephone: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Telefone'
                },
                value: '',
                validation: {
                    required: true,
                    isNumeric: true,
                    minLength: 10,
                    maxLength: 10
                },
                valid: false,
                touched: false
            }, cellphone: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Celular'
                },
                value: '',
                validation: {
                    required: true,
                    isNumeric: true,
                    minLength: 11,
                    maxLength: 11
                },
                valid: false,
                touched: false
            }, useWhatsapp: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'true', displayValue: 'Utilizar Whatsapp' },
                        { value: 'false', displayValue: 'Não Utilizar Whatsapp' }
                    ]
                },
                value: 'true',
                validation: {},
                valid: true
            }
        },
        formIsValid: false,
        signUpRequested: false
    }

    switchAuthModeHandler = () => (
        this.props.history.replace('/authenticate')
    )


    signUpDataHandler = (event) => {
        event.preventDefault();

        const formData = {};
        for (let formElementIdentifier in this.state.controls) {
            formData[formElementIdentifier] = this.state.controls[formElementIdentifier].value;
        }
        const signUpData = formData;

        this.props.onSignUp(signUpData, true, false);
        this.setState({signUpRequested: true});
    }

    editDataHandler = (event) => {
        event.preventDefault();

        const formData = {};
        for (let formElementIdentifier in this.state.editControls) {
            formData[formElementIdentifier] = this.state.editControls[formElementIdentifier].value;
        }
        const editData = formData;

        axios.patch('/users', editData, {headers:{
            "x-auth":this.props.token
        }})
    }

    inputChangedHandler = (event, inputIdentifier) => {

        const controls = this.props.isAuthenticated ? this.state.editControls : this.state.controls;
        const updatedFormElement = updateObject(controls[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, controls[inputIdentifier].validation),
            touched: true
        });

        const updatedControls = updateObject(controls, {
            [inputIdentifier]: updatedFormElement
        });

        let formIsValid = true;
        for (let inputIdentifier in updatedControls) {
            formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
        }
        if(this.props.isAuthenticated){
            this.setState({ editControls: updatedControls, formIsValid: formIsValid });
        }else{
            this.setState({ controls: updatedControls, formIsValid: formIsValid });
        }
    }

    render() {
        const formElementsArray = [];
        const controls = this.props.isAuthenticated ? this.state.editControls : this.state.controls;
        for (let key in controls) {
            formElementsArray.push({
                id: key,
                config: controls[key]
            });
        }

        let form = (
            <form onSubmit={this.props.isAuthenticated ? this.editDataHandler : this.signUpDataHandler}>
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
                <Button onClick={this.switchAuthModeHandler}>LOGIN</Button>
            </form>
        );
        if (this.props.loading) {
            form = <Spinner />;
        }

        return (
            <div className={styles.ContactData}>
                {this.props.error && this.state.signUpRequested ? this.props.error : null}
                <h4>Dados para Cadastro</h4>
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

const mapDispatchToProps = dispatch => {
    return {
        onSignUp: (signUpData, isSignup) => dispatch(actions.auth(signUpData, isSignup)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);