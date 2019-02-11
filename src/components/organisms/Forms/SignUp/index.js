import React, { Component } from 'react';
import { connect } from 'react-redux';


import Text from '../../../molecules/Fields/TextField';
import Email from '../../../molecules/Fields/EmailField';
import Password from '../../../molecules/Fields/PasswordField';
import Select from '../../../molecules/Fields/SelectField';
import Spinner from '../../../atoms/Spinner';
import * as actions from '../../../../store/actions';
import { checkValidity, updateObject } from '../../../../shared/utility';
import Button from '../../../atoms/Buttons/Button';
import HeadingPrimary from '../../../atoms/Headers/HeadingPrimary';
import styles from '../styles.module.css';

class SignUp extends Component {
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
            },
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
        isFormValid: false,
        signUpRequested: false,
        error: null
    }

    switchAuthModeHandler = () => (
        this.props.history.replace('/authenticate')
    )

    signUpDataHandler = (event) => {
        event.preventDefault();

        const formData = {};
        for (let formElementIdentifier in this.state.formControls) {
            formData[formElementIdentifier] = this.state.formControls[formElementIdentifier].value;
        }
        const signUpData = formData;

        this.props.onSignUp(signUpData, true, false);
        this.setState({ signUpRequested: true });
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
            <form className={styles.DefaultForm}>
                <HeadingPrimary>Dados para Cadastro</HeadingPrimary>
                {this.state.error
                    ?
                    <span>{this.state.error}</span>
                    :
                    null
                }

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

                <Text
                    label={this.state.formControls.fullName.label}
                    placeholder={this.state.formControls.fullName.placeholder}
                    validationMessage={this.state.formControls.fullName.validationMessage}
                    value={this.state.formControls.fullName.value}
                    onChange={(event) => this.inputChangedHandler(event, 'fullName')}
                    touched={this.state.formControls.fullName.wasTouched}
                    valid={this.state.formControls.fullName.isValid}
                />

                <Text
                    label={this.state.formControls.telephone.label}
                    placeholder={this.state.formControls.telephone.placeholder}
                    validationMessage={this.state.formControls.telephone.validationMessage}
                    value={this.state.formControls.telephone.value}
                    onChange={(event) => this.inputChangedHandler(event, 'telephone')}
                    touched={this.state.formControls.telephone.wasTouched}
                    valid={this.state.formControls.telephone.isValid}
                />

                <Text
                    label={this.state.formControls.cellphone.label}
                    placeholder={this.state.formControls.cellphone.placeholder}
                    validationMessage={this.state.formControls.cellphone.validationMessage}
                    value={this.state.formControls.cellphone.value}
                    onChange={(event) => this.inputChangedHandler(event, 'cellphone')}
                    touched={this.state.formControls.cellphone.wasTouched}
                    valid={this.state.formControls.cellphone.isValid}
                />

                <Select
                    label={this.state.formControls.useWhatsapp.label}
                    options={this.state.formControls.useWhatsapp.options}
                    value={this.state.formControls.useWhatsapp.value}
                    onChange={(event) => this.inputChangedHandler(event, 'useWhatsapp')}
                />
                <div className={styles.DefaultFormButtonBox}>
                    <Button
                        disabled={!this.state.isFormValid}
                        onClick={this.state.isFormValid
                            ?
                            this.props.isAuthenticated
                                ?
                                this.editDataHandler
                                :
                                this.signUpDataHandler
                            :
                            null
                        }>ENVIAR</Button>
                    {
                        this.props.isAuthenticated
                            ?
                            null
                            :
                            <Button onClick={this.switchAuthModeHandler}>LOGIN</Button>
                    }
                </div>
            </form>
        );
        if (this.props.loading) {
            form = <Spinner />;
        }

        return (
            <div className={styles.DefaultFormBox}>
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

//Separar
const mapDispatchToProps = dispatch => {
    return {
        onSignUp: (signUpData, isSignup) => dispatch(actions.auth(signUpData, isSignup)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);