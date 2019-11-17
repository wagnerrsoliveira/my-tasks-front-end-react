import React from "react";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import AuthService from "../services/AuthService";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Tasks from "../pages/Tasks";

const PrivateRoute = ({ component: Component, ...rest }: any) => (
    <Route {...rest} render={(props) => {
        if (AuthService.isAuthenticated()) {
            if (props.location.pathname === "/login") {
                return <Redirect to={{ pathname: "/", state: { from: props.location } }} />;
            } else {
                return <Component {...props} />;
            }
        } else {
            if (props.location.pathname === "/login") {
                return <Component {...props} />;
            } else {
                return <Redirect to={{ pathname: "/login", state: { from: props.location } }} />;
            }
        }

    }} />
);

const Routes = (props: { reload: boolean }) => (
    <BrowserRouter>
        <Switch>
            <PrivateRoute exact path="/" component={() => <Home />} />
            <PrivateRoute exact path="/tarefas" component={() => <Tasks />} />

            <PrivateRoute exact path="/login" component={() => <Login />} />
        </Switch>
    </BrowserRouter>
);

export default React.memo(Routes);