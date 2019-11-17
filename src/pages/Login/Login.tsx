import React, { PureComponent } from "react";

import { Grid, Paper, Typography, TextField, FormControl, InputLabel, Input, InputAdornment, IconButton, Fab } from "@material-ui/core";

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import NavigationIcon from '@material-ui/icons/Navigation';

import { ILoginProps, ILoginState } from "./types";
import AuthService from "../../services/AuthService";
import TasksContext from "../../app/context/TasksContext";


import "./Login.css";
import { EMessage } from "../../components/Message/types";


class Login extends PureComponent<ILoginProps, ILoginState> {
    static contextType = TasksContext;

    private service: AuthService;

    constructor(props: ILoginProps) {
        super(props);
        this.state = {
            user: "",
            password: "",
            showPassword: false,
            errorMessage: ""
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
        this.context.setLoading(true)
        this.service.login(this.state.user, this.state.password)
            .then((result) => {
                if (result && result.success) {
                    localStorage.setItem("token", result.data.token);
                    this.context.setIsAuthenticated(true);
                } else {
                    this.setState({
                        ...this.state,
                        errorMessage: "Usuário e/ou Senha inválidos"
                    })
                    this.context.handleOpenMessage("Usuário e/ou Senha inválidos, Verifique os dados e tente novamente", EMessage.error)
                }
            }).catch((e) => {
                this.context.handleOpenMessage("Ocorreu um erro inesperado, Tente novamente", EMessage.error)

            }).finally(() => {
                this.context.setLoading(false)

            })
    }

    render() {
        return (
            <Grid
                container
                direction="column"
                alignItems="center"
                justify="center"
                style={{ width: "100%", height: "100%" }}
            >
                <Paper elevation={1} className="container-login" >
                    <Grid container
                        direction="column"
                        justify="center"
                        alignItems="center">
                        <img src={require('./tasks.jpeg')}
                            alt={"logo"}
                            style={{ height: "100px" }}
                        />
                        <Typography>My Tasks</Typography>

                        <TextField
                            id="login-user"
                            label="Usuário"
                            margin="normal"
                            value={this.state.user}
                            onChange={this.handleChangeUser}
                            fullWidth
                        />

                        <FormControl fullWidth>
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
                        {
                            this.state.errorMessage.length > 1 &&
                            <Grid
                                container
                                direction="column"
                                justify="center"
                                alignItems="center"
                                className="error-message-login">
                                <Typography>{this.state.errorMessage}</Typography>
                            </Grid>
                        }

                        <Grid className="grid-button-login">
                            <Fab variant="extended"
                                style={{ background: "#92ddf5", color: "rgb(49, 49, 49)", width: "200px" }}
                                aria-label="add"
                                onClick={this.handleClickLogin}
                                size="large"
                            >
                                <NavigationIcon />
                                Entrar
                            </Fab>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        )
    }
}

export default Login;