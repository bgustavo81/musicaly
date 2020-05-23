import React, { Fragment, useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { connect } from 'react-redux';
import * as actions from '../actions';
import history from '../history';

import Navbar from "./Navbar";
import Landing from "./Landing";

import setAuthToken from "../utils/setAuthToken";  //sets the authentication token
import Routes from "./routing/Routes";


import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

class App extends React.Component {
  componentDidMount() {
    this.props.loadUser()
  }

  render() {
    return (
      <Router history={history} forceRefresh={true}>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route component={Routes} />
          </Switch>
        </Fragment>
      </Router>
  );
  }
}

export default connect(
  null,
  actions
)(App);