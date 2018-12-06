import React, { Component } from 'react';
import  Button  from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import axios from '../../../axios';
import Input from '../../../components/UI/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions';
import { checkValidity, updateObject } from '../../../shared/utility';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
});

class AddInterest extends Component {
    componentDidMount() {
        let options = [];
        if (this.props.categories !== null) {
            this.props.categories.map(category => {
                return options.push({ value: category._id, displayValue: category.name });
            });

            const updatedInterestForm = {
                ...this.state.interestForm,
                _category: {
                    ...this.state.interestForm._category,
                    elementConfig: {
                        ...this.state.interestForm._category.elementConfig,
                        options
                    },
                    value: options[0]
                }

            };

            this.setState({ interestForm: updatedInterestForm });
        }
    }

    state = {
        interestForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Nome do Interesse'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            description: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Descrição'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 1,
                    maxLength: 200
                },
                valid: false,
                touched: false
            },
            price: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Valor desejado'
                },
                value: '',
                validation: {
                    required: true,
                    isNumeric: true
                },
                valid: false,
                touched: false
            },
            _category: {
                elementType: 'select',
                elementConfig: {
                    options: [
                    ]
                },
                value: '',
                validation: {},
                valid: false
            }
        },
        formIsValid: false,
        userMessage: null
    }

    addInterestHandler = (event) => {
        event.preventDefault();

        const interest = {};
        for (let formElementIdentifier in this.state.interestForm) {
            interest[formElementIdentifier] = this.state.interestForm[formElementIdentifier].value;
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
        let updatedFormElement = null;
        updatedFormElement = updateObject(this.state.interestForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.interestForm[inputIdentifier].validation),
            touched: true
        });

        const updatedInterestForm = updateObject(this.state.interestForm, {
            [inputIdentifier]: updatedFormElement
        });

        let formIsValid = true;
        for (let inputIdentifier in updatedInterestForm) {
            formIsValid = updatedInterestForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({ interestForm: updatedInterestForm, formIsValid: formIsValid });
    }

    render() {
        const { classes } = this.props;
        
        const formElementsArray = [];
        for (let key in this.state.interestForm) {
            formElementsArray.push({
                id: key,
                config: this.state.interestForm[key]
            });
        }

        let form = (
            <form onSubmit={this.addInterestHandler} className="defaultForm">
            <h4>O que deseja comprar?</h4>
            {this.props.userMessage ?
                    <Paper className={classes.root} elevation={1}>
                        <Typography component="p">
                            {this.props.userMessage}
                        </Typography>
                    </Paper>
                    : null}
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
                <Button disabled={!this.state.formIsValid}>ADICIONAR INTERESSE</Button>
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
            <div>
                {isAuthenticated}
                {form}
            </div>
        );
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

export default connect(mapStateToProps, mapActionsToProps)(withErrorHandler(withStyles(styles)(AddInterest), axios));