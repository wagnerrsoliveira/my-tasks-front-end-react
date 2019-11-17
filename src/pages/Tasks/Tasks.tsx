import React, { PureComponent } from "react";

import { Grid, Fab, Tooltip, Paper } from "@material-ui/core";
import { ITasksState, ITasksProps } from "./types";
import TaskService from "../../services/TaskService";
import TasksContext from "../../app/context/TasksContext";
import { EMessage } from "../../components/Message/types";
import CardTask from "../../components/CardTask";
import { Task } from "../../models/Task";

import PostAddIcon from '@material-ui/icons/PostAdd';
import Confirmation from "../../components/Confirmation";
import FormTask from "../../components/FormTask";
import { ITaskRequest } from "../../components/FormTask/types";


class Tasks extends PureComponent<ITasksProps, ITasksState> {

    private service: TaskService;

    static contextType = TasksContext;

    constructor(props: ITasksProps) {
        super(props);

        this.state = {
            tasks: [],
            isEdit: false,
            openConfirmation: false,
            openFormTask: false
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
        this.setState({
            ...this.state,
            task,
            isEdit: true,
            openFormTask: true
        })
    }

    private handleOnClickExcluir = (task: Task) => {
        this.setState({
            openConfirmation: true,
            taskForDelete: task
        })
    }

    private handleOpenAddTask = () => {
        this.setState({
            ...this.state,
            task: {
                name: "",
                status: 0,
                description: "",
            } as Task,
            isEdit: false,
            openFormTask: true
        })
    }

    private handleOnClickConfirmation = (confirm: boolean, task?: Task) => {
        if (confirm && task && task.id) {
            this.context.setLoading(true);
            this.service.deleteTask(task.id)
                .then((result) => {

                    if (result && result.success) {
                        this.setState({
                            tasks: result.data,
                            openConfirmation: false
                        })
                        this.context.handleOpenMessage("Tarefa excluída com sucesso.", EMessage.success)
                    } else {
                        this.context.handleOpenMessage("Ocorreu um erro inesperado, Tente novamente", EMessage.error)
                    }
                }).catch((e) => {
                    this.context.handleOpenMessage("Ocorreu um erro inesperado, Tente novamente", EMessage.error)
                })
                .finally(() => {
                    this.context.setLoading(false);
                })
        } else {
            this.setState({
                openConfirmation: false,
                taskForDelete: undefined
            })
        }
    }

    private handleOnClickSubmit = (isEdit: boolean, task?: ITaskRequest) => {
        if (task) {
            this.context.setLoading(true);
            if (isEdit) {
                this.service.putTask(task).then((result) => {
                    if (result && result.success) {
                        this.setState({
                            tasks: result.data,
                            openFormTask: false
                        })
                        this.context.handleOpenMessage("Tarefa Atualizada com sucesso", EMessage.success)
                    } else {
                        this.context.handleOpenMessage("Ocorreu um erro inesperado, Tente novamente", EMessage.error)
                    }
                }).catch((e) => {
                    this.context.handleOpenMessage("Ocorreu um erro inesperado, Tente novamente", EMessage.error)
                })
                    .finally(() => {
                        this.context.setLoading(false);
                    })
            } else {
                this.service.postTask(task).then((result) => {
                    if (result && result.success) {
                        this.setState({
                            tasks: result.data,
                            openFormTask: false
                        })
                        this.context.handleOpenMessage("Tarefa Gravada com sucesso", EMessage.success)
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

        } else {
            this.setState({
                ...this.state,
                openFormTask: false,
                task: {
                    name: "",
                    description: "",
                    status: 0
                } as Task
            })
        }
    }

    render() {
        let tasksCreated = this.state.tasks.filter(t => t.status === 0);
        let tasksDoing = this.state.tasks.filter(t => t.status === 1);
        let tasksCancel = this.state.tasks.filter(t => t.status === 2);
        let tasksDone = this.state.tasks.filter(t => t.status === 3);

        return (
            <Grid
                style={{ margin: "10px", height: "100%" }}

            >
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="stretch"

                >
                    <Paper elevation={2}
                        style={{ padding: "20px", margin: "10px", height: "100%" }}
                    >
                        <Grid style={{ padding: "20px" }}>Criada</Grid>
                        {
                            tasksCreated.map((task, index) => {
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

                    </Paper>

                    <Paper elevation={2}
                        style={{ padding: "20px", margin: "10px" }}
                    >
                        <Grid style={{ padding: "20px" }}>Fazendo</Grid>
                        {
                            tasksDoing.map((task, index) => {
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

                    </Paper>

                    <Paper elevation={2}
                        style={{ padding: "20px", margin: "10px" }}
                    >

                        <Grid style={{ padding: "20px" }}>Feito</Grid>
                        {
                            tasksDone.map((task, index) => {
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

                    </Paper>

                    <Paper elevation={2}
                        style={{ padding: "20px", margin: "10px" }}
                    >
                        <Grid style={{ padding: "20px" }}>Cancelada</Grid>
                        {
                            tasksCancel.map((task, index) => {
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

                    </Paper>



                </Grid>
                {/*Modal Formulário*/}
                <FormTask
                    open={this.state.openFormTask}
                    isEdit={this.state.isEdit}
                    task={this.state.task}
                    handleOnClickSubmit={this.handleOnClickSubmit}
                />

                {/*Modal para confirmação*/}
                {this.state.openConfirmation && <Confirmation
                    open={this.state.openConfirmation}
                    task={this.state.taskForDelete}
                    handleOnClickConfirmation={this.handleOnClickConfirmation}
                />}

                {/*Botão adicionar nova tarefa*/}
                <Grid
                    style={{ position: "fixed", bottom: "10px", right: "10px" }}
                >
                    <Tooltip title="Adicionar">
                        <Fab color="primary"
                            aria-label="add"
                            style={{ width: "64px", height: "64px" }}
                            onClick={this.handleOpenAddTask}
                        >
                            <PostAddIcon />
                        </Fab>
                    </Tooltip>
                </Grid>
            </Grid>)
    }
}

export default Tasks;