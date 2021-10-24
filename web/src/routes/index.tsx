import React from 'react';
import { Route, Switch } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import SignUpCompany from '../pages/SignUpCompany';
import Home from '../pages/Home';
import PageMap from '../pages/Map';
import NgoDetail from '../pages/Ngo';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/signupcompany" component={SignUpCompany} />
      <Route path="/map" component={PageMap} />
      <Route path="/ngos/:id" component={NgoDetail} />
    </Switch>
  );
}

export default Routes;