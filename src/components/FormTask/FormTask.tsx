import React, { useState, PureComponent } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import { IFormTaskProps, IFormTaskState, ITaskRequest } from './types';
import { Typography, TextField, Grid, InputLabel, Select, MenuItem, FormControl } from '@material-ui/core';

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} timeout={300} mountOnEnter unmountOnExit />;
});

export default class FormTask extends PureComponent<IFormTaskProps, IFormTaskState> {

    constructor(props: IFormTaskProps) {
        super(props)
        this.state = {
            name: (props.task ? props.task.name : ""),
            description: (props.task ? props.task.description : ""),
            status: (props.task ? props.task.status : 0)
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
                    <DialogContent style={{ minWidth: "300px" }}>
                        <DialogContentText id="alert-dialog-slide-description">
                            <form noValidate autoComplete="off">
                                <Grid
                                    container
                                    direction={"column"}

                                >
                                    <TextField
                                        id="name"
                                        label="Nome"
                                        margin="normal"
                                        value={this.state.name}
                                        onChange={(e) => { this.setName(e.target.value) }}
                                    />

                                    <TextField
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
                            onClick={() => this.props.handleOnClickSubmit(this.props.isEdit, { id: this.props.task ? this.props.task.id ? this.props.task.id : 0 : 0, name: this.state.name, description: this.state.description, status: this.state.status } as ITaskRequest)} >
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