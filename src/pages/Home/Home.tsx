import React, { PureComponent } from "react";

import { Grid, Typography, Link } from "@material-ui/core";
import PostAddIcon from '@material-ui/icons/PostAdd';


class Home extends PureComponent {


    render() {
        return (<Grid style={{ margin: "20px" }}>
            <Link href="/tarefas">
                <Grid
                    style={{ height: "100px", width: "200px", borderRadius: "5px", background: "#3f51b5", color: "white", cursor: "pointer" }}
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"

                >
                    <Typography>Tarefas</Typography>
                    <PostAddIcon />
                </Grid>
            </Link>

        </Grid>)
    }
}

export default Home;