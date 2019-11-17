import React, { PureComponent } from "react";

import { AppBar, Toolbar, IconButton, Typography, Grid } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import TasksContext from "../../app/context/TasksContext";
import { IMenuProps } from "./types";

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
            <AppBar position="static" >
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        My Tasks
                        </Typography>
                    <div />
                    <div >
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={"logout"}
                            aria-haspopup="true"
                            onClick={this.handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </div>
                    <Grid>{this.userName}</Grid>
                </Toolbar>
            </AppBar>)
    }
}

export default Menu;