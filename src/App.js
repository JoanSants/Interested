import React, { Component } from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import Interests from './containers/Interests/Interests';

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path='/' component={Interests}/>
        </Switch>
      </Layout>
    );
  }
}

export default withRouter(App);
