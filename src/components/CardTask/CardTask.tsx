import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { ICardTaskProps } from './types';
import { EStatusTask } from '../../models/Task';
import { Tooltip, Grid } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import BuildIcon from '@material-ui/icons/Build';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import PersonPinIcon from '@material-ui/icons/PersonPin';



const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            maxWidth: 345,
        },
        media: {
            height: 0,
            paddingTop: '56.25%', // 16:9
        },
        expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: 'rotate(180deg)',
        },
        avatar: {
            backgroundColor: red[500],
        },
    }),
);

function getIcon(title: string, icon: JSX.Element, style: React.CSSProperties) {
    return (
        <Avatar aria-label="recipe" style={style}>
            <Tooltip title={title}>
                {icon}
            </Tooltip>
        </Avatar>
    )
}

function getIconStatus(status: EStatusTask) {
    switch (status) {
        case EStatusTask.CREATED:
            return getIcon("Criado", <AddCircleIcon />, { background: "#255b89" })

        case EStatusTask.DOING:
            return getIcon("Fazendo", <BuildIcon />, { background: "#fbff9d" })

        case EStatusTask.DONE:
            return getIcon("Concluído", <CheckCircleIcon />, { background: "#11bb1c" })
        case EStatusTask.CANCEL:
            return getIcon("Cancelado", <AddCircleIcon />, { background: "#11bb1c" })
    }
    return <MoreVertIcon />
}

export default function CardTask(props: ICardTaskProps) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card className={classes.card}>
            <CardHeader
                style={{ background: "#e7eef4" }}
                avatar={getIconStatus(props.task.status)}
                title={props.task.name}
                subheader={
                    `Criado em : ${new Date(props.task.created_at).toLocaleDateString("pt-br")}`
                }
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {props.task.description}
                </Typography>
            </CardContent>
            <CardContent>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    style={{ padding: "5px" }}
                >
                    <PersonPinIcon />
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                        style={{ fontWeight: "bold" }}
                    >
                        {localStorage.getItem("userName")}
                    </Typography>

                </Grid>
            </CardContent>
            <CardActions disableSpacing>
                <Grid
                    container
                    direction="row"
                    justify="flex-end"
                >
                    <Tooltip title="Editar">
                        <IconButton
                            onClick={() => props.handleOnClickEditar(props.task)}
                            aria-label="Editar">
                            <EditIcon style={{ color: "green" }} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Excluir">
                        <IconButton
                            onClick={() => props.handleOnClickExcluir(props.task)}
                            aria-label="Excluir">
                            <DeleteIcon style={{ color: "red" }} />
                        </IconButton>
                    </Tooltip>
                </Grid>
            </CardActions>

        </Card>
    );
}