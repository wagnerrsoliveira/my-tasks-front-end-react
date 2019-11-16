import React, { PureComponent } from "react";

import { Grid, Paper, Typography, TextField, FormControl, InputLabel, Input, InputAdornment, IconButton, Fab } from "@material-ui/core";

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import NavigationIcon from '@material-ui/icons/Navigation';

import { ILoginProps, ILoginState } from "./types";
import AuthService from "../../services/AuthService";
import TasksContext from "../../app/context/TasksContext";

import "./Login.css";


class Login extends PureComponent<ILoginProps, ILoginState> {
    static contextType = TasksContext;

    private service: AuthService;

    constructor(props: ILoginProps) {
        super(props);
        this.state = {
            user: "",
            password: "",
            showPassword: false
        }
        this.service = new AuthService();
    }

    private handleClickShowPassword = () => {
        this.setState({
            ...this.state,
            showPassword: !this.state.showPassword
        });
    }

    private handleChangePassword = (event: any) => {
        let password = String(event.target.value);
        this.setState({
            ...this.state,
            password
        });
    }


    private handleChangeUser = (event: any) => {
        let user = String(event.target.value);
        this.setState({
            ...this.state,
            user
        });
    }

    private handleClickLogin = () => {
        this.service.login(this.state.user, this.state.password)
            .then((result) => {
                if (result && result.success) {
                    localStorage.setItem("token", result.data.token);
                    this.context.setIsAuthenticated(true);
                }
            })
    }

    render() {
        return (
            <Paper elevation={1} className="container-login">
                <Grid container direction="column" justify="center" alignItems="center">
                    <AccountCircleIcon />
                    <Typography>Login...</Typography>

                    <TextField
                        id="login-user"
                        label="Usuário"
                        margin="normal"
                        value={this.state.user}
                        onChange={this.handleChangeUser}
                    />

                    <FormControl >
                        <InputLabel htmlFor="adornment-password">Senha</InputLabel>
                        <Input
                            id="adornment-password"
                            type={this.state.showPassword ? 'text' : 'password'}
                            value={this.state.password}
                            onChange={this.handleChangePassword}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={this.handleClickShowPassword}
                                    >
                                        {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>

                    <Fab variant="extended" color="primary" aria-label="add"
                        onClick={this.handleClickLogin}
                    >
                        <NavigationIcon />
                        Entrar
                    </Fab>
                </Grid>
            </Paper>
        )
    }
}

export default Login;