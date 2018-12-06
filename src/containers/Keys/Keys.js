import React, { Component } from 'react';
import axios from '../../axios';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import Key from './Key/Key';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import { fetchUserData } from '../../store/actions/auth';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        display: 'block',
        textAlign: 'center',
        marginLeft: '20%',
        marginRight: '20%',
        marginTop: '10px'
    },
    mainInfo: {
        fontSize:'20px'
    }
});


class Keys extends Component {

    state = {
        keys: null,
        error: null
    }

    componentDidMount() {
        axios.get('/keys').then(response => {
            this.setState({ keys: response.data.keys });
        }).catch(err => {
            this.setState({ error: err });
        });
    }

    keyBoughtHandler = (id) => {
        const body = { "key": id }
        axios.post('/keys/buy', body, {
            headers: {
                "x-auth": this.props.token
            }
        }).then(response => {
            this.props.onFetchUser(this.props.token);
        }).catch(err => {
            this.setState({ error: err.response.data.message });
        })
    }

    render() {
        const { classes } = this.props;
        let keys = null;
        if (this.state.keys) {
            keys = this.state.keys.map(key => {
                return <Key
                    key={key._id}
                    id={key._id}
                    name={key.name}
                    description={key.description}
                    price={key.price}
                    quantity={key.quantity}
                    buyKey={(id) => { this.keyBoughtHandler(id) }}
                    isAuth={this.props.isAuthenticated}
                />
            });

            if (keys.length === 0) {
                keys = <h5>Não possuímos chaves no momento, tente novamente mais tarde.</h5>
            }
        }
        let keysQuantity = null;
        if (this.props.user) {
            keysQuantity = <Paper className={classes.root} elevation={1}>
            <Typography component="p" className={classes.mainInfo}>
                    Você possui <b>{this.props.user.keys}</b> chaves!
            </Typography>
            </Paper>
        }
        return (
            <Aux>
                <p>{this.state.error ? this.state.error : null}</p>
                {keysQuantity}
                {keys}
            </Aux>
        )
    }

}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        user: state.auth.user,
        isAuthenticated: state.auth.token !== null
    }
}

const mapActionsToProps = dispatch => {
    return {
        onFetchUser: (token) => dispatch(fetchUserData(token))
    }
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Keys));