import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom'

import SignIn from '../../organisms/Forms/SignIn';
import SignUp from '../../organisms/Forms/SignUp';
import styles from './styles.module.css';

class Auth extends Component {

    render() {
        return (
            <div className={styles.Container}>
                <Switch>
                    <Route path={this.props.match.path + '/signup'} component={SignUp} />
                    <Route path={this.props.match.path + '/'} component={SignIn} />
                </Switch>
            </div>
        )
    }
}

export default withRouter(Auth);