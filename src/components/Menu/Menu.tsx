import React, { PureComponent } from "react";

import { AppBar, Toolbar, IconButton, Typography, Link, Tooltip } from "@material-ui/core";
import TasksContext from "../../app/context/TasksContext";
import { IMenuProps } from "./types";
import HomeIcon from '@material-ui/icons/Home';
import KeyboardTabIcon from '@material-ui/icons/KeyboardTab';


class Menu extends PureComponent<IMenuProps> {

    static contextType = TasksContext;

    private userName: string;

    constructor(props: IMenuProps) {
        super(props);
        this.userName = String(localStorage.getItem("userName"));
    }

    componentDidMount = () => {
        this.userName = String(localStorage.getItem("userName"));
    }

    componentDidUpdate = () => {
        this.userName = String(localStorage.getItem("userName"));
    }

    private handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        localStorage.removeItem("token");
        localStorage.removeItem("userName");

        this.context.setIsAuthenticated(false);
    }

    render() {
        return (
            <div style={{ flexGrow: 1 }} >
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <Link color="inherit" href="/"><HomeIcon /></Link>
                        </IconButton>
                        <Typography variant="h6" style={{ flexGrow: 1 }}>
                            <Link color="inherit" href="/tarefas">Tarefas</Link>
                        </Typography>


                        {this.userName}
                        <Tooltip title="Logout">
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={this.handleProfileMenuOpen}
                                color="inherit"
                            >
                                <KeyboardTabIcon />
                            </IconButton>
                        </Tooltip>
                    </Toolbar>
                </AppBar>
            </div>);
    }
}

export default Menu;