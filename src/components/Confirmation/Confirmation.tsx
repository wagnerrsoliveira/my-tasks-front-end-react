import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import { IConfirmationProps } from './types';

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} timeout={300} />;
});

export default function Confirmation(props: IConfirmationProps) {
    return (
        <div>
            <Dialog
                open={props.open}
                TransitionComponent={Transition}
                keepMounted
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title"
                    style={{ background: "#ffa000", color: "#ffffff" }}>Tem certeza que deseja excluir a Tarefa?</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Id: "{props.task ? props.task.id : ""}"<br />
                        Nome: "{props.task ? props.task.name : ""}"<br />
                        Descrição: "{props.task ? props.task.description : ""}"<br />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        style={{ background: "green", color: "white" }}
                        onClick={() => props.handleOnClickConfirmation(true, props.task)} >
                        Sim
          </Button>
                    <Button
                        style={{ background: "red", color: "white" }}
                        onClick={() => props.handleOnClickConfirmation(false)} color="primary">
                        Não
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}