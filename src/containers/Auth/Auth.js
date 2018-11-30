import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom'

import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';

class Auth extends Component {
    
    render() {
        return (
            <Switch>
                <Route path={this.props.match.path + '/signup'} component={SignUp}/>
                <Route path={this.props.match.path + '/'} component={SignIn}/>
            </Switch>
        )
    }
}

export default withRouter(Auth);