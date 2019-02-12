import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from './store/actions/index';
import Layout from './hoc/Layout';
import Home from './components/pages/Home';
import AddInterests from './components/pages/AddInterest';
import MyInterests from './components/pages/MyInterests';
import Auth from './components/pages/Auth';
import Logout from './components/pages/Auth/Logout';
import MyCoins from './components/pages/MyCoins';
import MyContacts from './components/pages/MyContacts';
import MyInfo from './components/pages/MyInfo';

class App extends Component {

  componentWillMount() {
    this.props.onTryAutoSignIn();
    this.props.onInitInterests();
  }

  render() {
    let routes = (
      <Switch>
        <Route path='/authenticate' component={Auth} />
        <Route path='/add-interest' component={AddInterests} />
        <Route path='/my-coins' component={MyCoins}/>
        <Route path='/' exact component={Home} />
        <Redirect to='/'/>
      </Switch>
    )

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/add-interest' component={AddInterests} />
          <Route path='/my-interests' component={MyInterests} />
          <Route path='/logout' component={Logout}/>
          <Route path='/my-coins' component={MyCoins}/>
          <Route path='/my-contacts' component={MyContacts} />
          <Route path='/my-info' component={MyInfo}/>
          <Route path='/' exact component={Home} />
          <Redirect to='/'/>
        </Switch>
      )
    }
    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
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
    onInitInterests: () => dispatch(actions.fetchInterests())
  }
}

export default withRouter(connect(mapStateToProps, mapActionsToProps)(App));
