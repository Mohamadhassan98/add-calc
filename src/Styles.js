import withStyles from "@material-ui/core/styles/withStyles";
import {Button, TextField} from "@material-ui/core";

export const NumButton = withStyles(theme => ({
    root: {
        width: '64px',
        height: '64px',
        margin: '5px'
    }
}))(Button);

export const BackspaceButton = withStyles(theme => ({
    root: {
        width: '64px',
        height: '64px',
        margin: '5px',
        backgroundColor: 'crimson',
        '&:hover': {
            backgroundColor: '#B22222'
        }
    }
}))(Button);

export const PlusButton = withStyles(theme => ({
    root: {
        width: '64px',
        height: '138px',
        margin: '5px',
        backgroundColor: 'cyan'
    }
}))(Button);

export const EqualsButton = withStyles(theme => ({
    root: {
        width: '138px',
        height: '64px',
        margin: '5px',
        backgroundColor: 'green'
    }
}))(Button);

export const Input = withStyles(theme => ({
    root: {
        margin: '2.5px',
        padding: '2.5px'
    }
}))(TextField);
