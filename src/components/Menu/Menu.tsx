import React, { PureComponent } from "react";

import { Grid, AppBar, Toolbar, IconButton, Badge, Typography } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';

class Menu extends PureComponent {

    private handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        localStorage.removeItem("token");
    }

    render() {
        return (
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Material-UI
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