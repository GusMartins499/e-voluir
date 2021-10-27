import React from "react";
import { Switch } from "react-router-dom";
import Route from "./Route";

import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import SignUpCompany from "../pages/SignUpCompany";
import Home from "../pages/Home";
import PageMap from "../pages/Map";
import NgoDetail from "../pages/Ngo";

function Routes() {
  return (
    <Switch>
      <Route path="/login" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/signupcompany" component={SignUpCompany} />

      <Route path="/map" isPrivate component={PageMap} />
      <Route path="/ngos/:id" isPrivate component={NgoDetail} />
      <Route exact path="/" isPrivate component={Home} />
    </Switch>
  );
}

export default Routes;
