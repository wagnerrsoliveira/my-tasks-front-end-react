import React, { PureComponent } from "react";

import { AppBar, Toolbar, IconButton, Typography, Grid } from "@material-ui/core";
import AccountCircle from '@material-ui/icons/AccountCircle';
import TasksContext from "../../app/context/TasksContext";
import { IConfirmationProps } from "./types";

class Confirmation extends PureComponent<IConfirmationProps> {
    static contextType = TasksContext;

    private userName: string;

    constructor(props: IConfirmationProps) {
        super(props);
        this.userName = String(localStorage.getItem("userName"));
    }

    componentDidMount = () => {
        this.userName = String(localStorage.getItem("userName"));
    }

    componentDidUpdate = () => {
        this.userName = String(localStorage.getItem("userName"));
    }

    private handleProfileConfirmationOpen = (event: React.MouseEvent<HTMLElement>) => {
        localStorage.removeItem("token");
        localStorage.removeItem("userName");

        this.context.setIsAuthenticated(false);
    }

    render() {
        return (
            <div />
        )
    }
}

export default Confirmation;