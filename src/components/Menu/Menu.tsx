import React, { PureComponent } from "react";

import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import TasksContext from "../../app/context/TasksContext";

class Menu extends PureComponent {
    static contextType = TasksContext;

    private handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        localStorage.removeItem("token");
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

                </Toolbar>
            </AppBar>)
    }
}

export default Menu;