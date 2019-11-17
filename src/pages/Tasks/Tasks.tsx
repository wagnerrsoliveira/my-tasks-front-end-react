import React, { PureComponent } from "react";

import { Grid } from "@material-ui/core";
import { ITasksState, ITasksProps } from "./types";
import TaskService from "../../services/TaskService";
import TasksContext from "../../app/context/TasksContext";
import { EMessage } from "../../components/Message/types";
import CardTask from "../../components/CardTask";
import { Task } from "../../models/Task";

class Tasks extends PureComponent<ITasksProps, ITasksState> {

    private service: TaskService;

    static contextType = TasksContext;

    constructor(props: ITasksProps) {
        super(props);

        this.state = {
            tasks: []
        }

        this.service = new TaskService();
    }

    componentDidMount = () => {
        this.context.setLoading(true);
        this.service.getTasks()
            .then((result) => {
                if (result && result.success) {
                    this.setState({
                        tasks: result.data
                    })
                } else {
                    this.context.handleOpenMessage("Ocorreu um erro inesperado, Tente novamente", EMessage.error)
                }
            }).catch((e) => {
                this.context.handleOpenMessage("Ocorreu um erro inesperado, Tente novamente", EMessage.error)
            })
            .finally(() => {
                this.context.setLoading(false);
            })
    }

    private handleOnClickEditar = (task: Task) => {

    }

    private handleOnClickExcluir = (task: Task) => {

    }

    render() {
        return (
            <Grid
                style={{ margin: "10px" }}
            >
                {
                    this.state.tasks.map((task, index) => {
                        return (
                            <Grid key={`${task}`}>
                                <CardTask
                                    task={task}
                                    handleOnClickEditar={this.handleOnClickEditar}
                                    handleOnClickExcluir={this.handleOnClickExcluir}
                                />
                            </Grid>
                        )
                    })
                }

            </Grid>)
    }
}

export default Tasks;