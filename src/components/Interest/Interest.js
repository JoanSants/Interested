import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import Modal from '../UI/Modal/Modal';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
    card: {
        minWidth: 275,
        display: 'inline-block',
        width: '30%',
        margin: '20px'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
};

class Interest extends Component {

    state = {
        modalDetails: false,
        modalContact: false,
        selectedContact: null
    }

    showDetailsHandler = () => {
        this.setState({ modalDetails: !this.state.modalDetails })
    }

    showContactHandler = (id) => {
        this.setState({ modalContact: !this.state.modalContact, selectedContact: id })
    }

    render() {
        const { classes } = this.props;
        return (
            <Aux>
                <Modal show={this.state.modalDetails} modalClosed={this.showDetailsHandler}>
                    <h1>{this.props.name}</h1>
                    <p>Detalhes: {this.props.description}</p>
                    <p>Valor estimado: {this.props.price}</p>
                </Modal>
                <Modal show={this.state.modalContact} modalClosed={this.showContactHandler}>
                    <h1>{this.props.name}</h1>
                    <p>{this.props.error ? this.props.error : null}</p>
                    {this.props.isAuthenticated
                        ?
                        <Button onClick={(id) => { this.props.postContactHandler(this.state.selectedContact) }}>Obter Contato</Button>
                        :
                        <NavLink to={'/authenticate'}><Button >Realizar Login</Button></NavLink>
                    }
                </Modal>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            {this.props.name}
                        </Typography>

                        <Typography component="p">
                            {this.props.price}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small"
                            key={this.props.id + 1}
                            onClick={this.showDetailsHandler}>detalhes</Button>

                        {!this.props.myInterest
                            ?
                            <Button size="small"
                                key={this.props.id + 2}
                                onClick={() => this.showContactHandler(this.props.id)}>contato</Button>
                            :
                            null}
                    </CardActions>
                </Card>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps, null)(withStyles(styles)(Interest));


