import React from "react";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import AuthService from "../services/AuthService";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Tasks from "../pages/Tasks";

const PrivateRoute = ({ component: Component, ...rest }: any) => (
    <Route {...rest} render={(props) => (
        AuthService.isAuthenticated() ?
            <Component {...props} /> :
            <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
    )} />
);

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <PrivateRoute exact path="/" component={() => <Home />} />
            <PrivateRoute exact path="/tarefas" component={() => <Tasks />} />

            <Route exact path="/login" component={() => <Login />} />
        </Switch>
    </BrowserRouter>
);

export default Routes;