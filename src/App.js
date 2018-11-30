import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from './store/actions/index';
import Layout from './hoc/Layout/Layout';
import Interests from './containers/Interests/Interests';
import AddInterests from './containers/Interests/AddInterest/AddInterest';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignIn();
  }

  render() {
    let routes = (
      <Switch>
        <Route path='/authenticate' component={Auth} />
        <Route path='/add-interest' component={AddInterests} />
        <Route path='/' exact component={Interests} />
        <Redirect to='/'/>
      </Switch>
    )

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/add-interest' component={AddInterests} />
          <Route path='/logout' component={Logout}/>
          <Route path='/' exact component={Interests} />
          <Redirect to='/'/>
        </Switch>
      )
    }
    return (
      <Layout>
        {routes}
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapActionsToProps = dispatch => {
  return {
    onTryAutoSignIn: () => dispatch(actions.authCheckState()),
  }
}

export default withRouter(connect(mapStateToProps, mapActionsToProps)(App));
