import React, { PureComponent } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import { IFormTaskProps, IFormTaskState, ITaskRequest } from './types';
import { TextField, Grid, InputLabel, Select, MenuItem, FormControl } from '@material-ui/core';
import TasksContext from '../../app/context/TasksContext';
import { EMessage } from '../Message/types';

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} timeout={300} mountOnEnter unmountOnExit />;
});

export default class FormTask extends PureComponent<IFormTaskProps, IFormTaskState> {
    static contextType = TasksContext;

    constructor(props: IFormTaskProps) {
        super(props)
        this.state = {
            name: (props.task ? props.task.name : ""),
            description: (props.task ? props.task.description : ""),
            status: (props.task ? props.task.status : 0),
            descriptionError: "",
            nameError: ""
        }
    }

    componentDidUpdate(prevProps: IFormTaskProps, prevState: IFormTaskState) {
        if (prevProps.task !== this.props.task) {
            this.setState({
                name: (this.props.task ? this.props.task.name : ""),
                description: (this.props.task ? this.props.task.description : ""),
                status: (this.props.task ? this.props.task.status : 0)
            })
        }
    }

    private setName = (name: string) => {
        this.setState({
            ...this.state,
            name
        })
    }

    private setDescription = (description: string) => {
        this.setState({
            ...this.state,
            description
        })
    }

    private setStatus = (status: number) => {
        this.setState({
            ...this.state,
            status
        })
    }

    submit = () => {
        console.log("submit")
        let nameError = "";
        let descriptionError = "";
        let isError = false;

        if (this.props.isEdit) {
            if (this.state.name.length >= 255) {
                nameError = "O campo nome deve ter o máximo de 255 caracteres";
                isError = true;
            }
            if (this.state.description.length >= 255) {
                descriptionError = "O campo nome deve ter o máximo de 255 caracteres";
                isError = true;
            }
        } else {
            if (this.state.name.length == 0) {
                nameError = "O campo nome é obrigatório";
                isError = true;
            } else {
                if (this.state.name.length >= 255) {
                    nameError = "O campo nome deve ter o máximo de 255 caracteres";
                    isError = true;
                }
            }
            if (this.state.description.length >= 255) {
                descriptionError = "O campo nome deve ter o máximo de 255 caracteres";
                isError = true;
            }

        }
        if (!isError) {

            this.props.handleOnClickSubmit(this.props.isEdit, { id: this.props.task ? this.props.task.id ? this.props.task.id : 0 : 0, name: this.state.name, description: this.state.description, status: this.state.status } as ITaskRequest)
        } else {
            this.context.handleOpenMessage("Um ou mais campos foram informados incorretamente, Tente novamente", EMessage.error)

            this.setState({
                ...this.state,
                descriptionError,
                nameError
            })
        }


    }

    render() {
        return (
            <div>
                <Dialog
                    open={this.props.open}
                    TransitionComponent={Transition}
                    keepMounted
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title"
                        style={{ background: "#3f51b5", color: "#ffffff" }}>

                        {this.props.isEdit ? "Editar Tarefa" : "Adicionar Nova Tarefa"}

                    </DialogTitle>
                    <DialogContent style={{ minWidth: "400px", width: "500px" }}>
                        <DialogContentText id="alert-dialog-slide-description">
                            <form noValidate autoComplete="off">
                                <Grid
                                    container
                                    direction={"column"}

                                >
                                    <TextField
                                        error={this.state.nameError.length > 1}
                                        helperText={this.state.nameError}
                                        id="name"
                                        label="Nome"
                                        margin="normal"
                                        value={this.state.name}
                                        onChange={(e) => { this.setName(e.target.value) }}
                                    />

                                    <TextField
                                        error={this.state.descriptionError.length > 1}
                                        helperText={this.state.descriptionError}
                                        id="description"
                                        label="Descrição"
                                        margin="normal"
                                        multiline
                                        value={this.state.description}
                                        onChange={(e) => { this.setDescription(e.target.value) }}
                                    />

                                    {
                                        this.props.isEdit &&
                                        <FormControl >
                                            <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={this.state.status}
                                                onChange={(e) => this.setStatus(Number(e.target.value))}
                                            >
                                                <MenuItem value={0}>Criado</MenuItem>
                                                <MenuItem value={1}>Fazendo</MenuItem>
                                                <MenuItem value={2}>Feito</MenuItem>
                                                <MenuItem value={3}>Cancelado</MenuItem>
                                            </Select>
                                        </FormControl>
                                    }


                                </Grid>
                            </form>

                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            style={{ background: "green", color: "white" }}
                            onClick={this.submit} >
                            Gravar
                  </Button>
                        <Button
                            style={{ background: "red", color: "white" }}
                            onClick={() => this.props.handleOnClickSubmit(this.props.isEdit)} color="primary">
                            Cancelar
                  </Button>
                    </DialogActions>
                </Dialog>
            </div >
        );
    }

}