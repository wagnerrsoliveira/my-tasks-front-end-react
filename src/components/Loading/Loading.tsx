import React, { PureComponent } from "react";
import { CircularProgress, Grid } from "@material-ui/core";

import './Loading.css';

class Menu extends PureComponent {

    render() {
        return (
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                className="loading-container">
                <CircularProgress
                    size="20rem"
                />
            </Grid>
        )
    }
}

export default Menu;