import React from 'react';
import Grid from '@material-ui/core/Grid';
import {Container, ListSubheader, Tooltip} from "@material-ui/core";
import {countOccurrence, nextId, trim} from "../Globals";
import {BackspaceButton, EqualsButton, Input, NumButton, PlusButton} from "../Styles";
import BackspaceIcon from '@material-ui/icons/Backspace';
import InputAdornment from "@material-ui/core/InputAdornment";
import ExposureIcon from '@material-ui/icons/Exposure';
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Divider from "@material-ui/core/Divider";
import axios from 'axios';
import CircularProgress from "@material-ui/core/CircularProgress";
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';


export default class AddCalc extends React.Component {
    wrong = 'Something went wrong';

    constructor(props) {
        super(props);
        this.state = {
            minus: false,
            input: '0',
            inputs: '0',
            result: false,
            anchorEl: null,
            loading: false,
            wrong: ''
        };
    }

    resetInputs = () => {
        if (this.state.result) {
            this.setState({
                result: false,
                inputs: '0',
                minus: false,
                wrong: ''
            });
        }
    };

    onNumPressed = (number) => {
        this.resetInputs();
        if (this.state.input === '0') {
            this.setState({
                input: number
            });
        } else {
            this.setState({
                input: `${this.state.input}${number}`
            });
        }
    };

    onZeroPressed = () => {
        this.resetInputs();
        if (this.state.input !== '0') {
            this.onNumPressed(0);
        }
    };

    onDecimalPointPressed = () => {
        this.resetInputs();
        if (!this.state.input.toString().includes('.')) {
            this.setState({
                input: `${this.state.input}.`
            });
        }
    };

    onBackspacePressed = () => {
        this.resetInputs();
        if (this.state.input.length > 1) {
            let input = this.state.input;
            input = input.substring(0, input.length - 1);
            this.setState({
                input: input
            });
        } else if (this.state.input !== '0') {
            this.setState({
                input: '0'
            });
        }
    };

    clearState = () => {
        this.setState({
            inputs: '0',
            input: '0',
            result: false,
            loading: false,
            minus: false,
            wrong: ''
        });
        this.longPressed = true;
    };

    backspacePress = () => {
        this.longPress = setTimeout(this.clearState, 1000);
    };

    backspaceRelease = () => {
        clearTimeout(this.longPress);
        if (!this.longPressed) {
            this.onBackspacePressed();
        }
        this.longPressed = false;
    };

    trimInput = (input) => {
        if (input.includes('.')) {
            input = trim(input, '0');
        }
        if (input.charAt(input.length - 1) === '.') {
            input = trim(input, '.');
        }
        return input;
    };

    onPlusPressed = () => {
        this.resetInputs();
        const input = this.trimInput(this.state.input.toString());
        const isZero = input === '0';
        this.setState({
            inputs: `${this.state.inputs === '0' ? '' : this.state.inputs}${this.state.minus && !isZero ? '(-' : ''}${input}${this.state.minus && !isZero ? ')' : ''}+`,
            input: '0',
            minus: false
        });
    };

    onEqualsPressed = (event) => {
        if (this.state.inputs !== '0' && !this.state.result) {
            this.setState({
                anchorEl: event.currentTarget
            });
        } else if (this.state.result) {
            this.resetInputs();
        } else {
            const input = this.trimInput(this.state.input.toString());
            const isZero = input === '0';
            this.setState({
                inputs: `${this.state.minus && !isZero ? '(-' : ''}${input}${this.state.minus && !isZero ? ')' : ''}`,
                input: '0',
                minus: false,
                result: true
            });
        }
    };

    onLinkChose = (method) => {
        this.setState({
            loading: true
        });
        const staticUrl = "https://django-test-ui-project.fandogh.cloud/math/add";
        const equation = `${this.state.inputs}${this.state.input}`;
        const inputs = equation.toString().split('+');
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].includes('(')) {
                inputs[i] = inputs[i].substring(1, inputs[i].length - 1);
            }
        }
        let url;
        switch (method) {
            case 1:
                url = `/${inputs[0]}/${inputs[1]}`;
                axios.get(`${staticUrl}${url}`).then(response => {
                    this.setState({
                        loading: false,
                        inputs: `${equation}=${response.data.result}`,
                        result: true,
                        input: '0'
                    });
                }).catch(() => {
                    this.setState({
                        loading: false,
                        wrong: this.wrong,
                        result: true,
                        inputs: equation,
                        input: '0'
                    });
                });
                break;
            case 2:
                url = '?';
                const ids = [];
                for (let i = 0; i < inputs.length; i++) {
                    const nextId1 = nextId();
                    if (!ids.includes(nextId1)) {
                        ids.push(nextId1);
                        url += `${nextId1}=${inputs[i]}&`;
                    } else {
                        i--;
                    }
                }
                url = trim(url, '&');
                axios.get(`${staticUrl}${url}`).then(response => {
                    this.setState({
                        loading: false,
                        inputs: `${equation}=${response.data.result}`,
                        result: true,
                        input: '0'
                    });
                }).catch(error => {
                    this.setState({
                        loading: false,
                        wrong: this.wrong,
                        result: true,
                        inputs: equation,
                        input: '0'
                    });
                });
                break;
            case 3:
                const formData = new FormData();
                const IDs = [];
                for (let i = 0; i < inputs.length; i++) {
                    const nextId1 = nextId();
                    if (!IDs.includes(nextId1)) {
                        IDs.push(nextId1);
                        formData.append(nextId1, inputs[i]);
                    } else {
                        i--;
                    }
                }
                axios.post(`${staticUrl}/`, formData).then(response => {
                    this.setState({
                        loading: false,
                        inputs: `${equation}=${response.data.result}`,
                        result: true,
                        input: '0'
                    });
                }).catch(error => {
                    this.setState({
                        loading: false,
                        wrong: this.wrong,
                        result: true,
                        inputs: equation,
                        input: '0'
                    });
                });
                break;
            default:
                break;
        }
        this.closeMenu();
    };

    toggleMinus = () => {
        this.setState({
            minus: !this.state.minus
        });
    };

    closeMenu = () => {
        this.setState({
            anchorEl: null
        });
    };

    render() {
        return (
            <React.Fragment>
                <main style={{
                    marginTop: '50px'
                }}>
                    <Container maxWidth='xl'>
                        <Grid container alignItems='center' direction='column' justify='center'>
                            <Grid item xl>
                                <Grid container direction='row'>
                                    <Grid item>
                                        <NumButton variant='contained'
                                                   onClick={() => this.onNumPressed(9)}>9</NumButton>
                                        <NumButton variant='contained'
                                                   onClick={() => this.onNumPressed(8)}>8</NumButton>
                                        <NumButton variant='contained'
                                                   onClick={() => this.onNumPressed(7)}>7</NumButton>
                                        <Tooltip title='Hold to clean' placement='top'>
                                            <BackspaceButton variant='contained' onMouseDown={this.backspacePress}
                                                             onMouseUp={this.backspaceRelease}>
                                                <BackspaceIcon/><DeleteSweepIcon/>
                                            </BackspaceButton>
                                        </Tooltip>
                                    </Grid>
                                    <Grid item>
                                        <Input
                                            InputProps={{
                                                style: {
                                                    width: '286px',
                                                    height: '64px'
                                                },
                                                readOnly: true,
                                                startAdornment: <InputAdornment
                                                    position="start">{this.state.minus ? '-' : ' '}</InputAdornment>,
                                                endAdornment: <InputAdornment position='end'>
                                                    <IconButton onClick={this.toggleMinus}>
                                                        <ExposureIcon/>
                                                    </IconButton>
                                                </InputAdornment>
                                            }}
                                            variant='outlined'
                                            fullWidth
                                            id={'input'}
                                            label={'input'}
                                            name={'input'}
                                            value={this.state.input}/>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xl>
                                <Grid container direction='row'>
                                    <Grid item>
                                        <Grid container direction='column'>
                                            <Grid item>
                                                <Grid container direction='row'>
                                                    <Grid item>
                                                        <Grid container direction='column'>
                                                            <Grid item>
                                                                <NumButton variant='contained'
                                                                           onClick={() => this.onNumPressed(6)}>6</NumButton>
                                                                <NumButton variant='contained'
                                                                           onClick={() => this.onNumPressed(5)}>5</NumButton>
                                                                <NumButton variant='contained'
                                                                           onClick={() => this.onNumPressed(4)}>4</NumButton>
                                                            </Grid>
                                                            <Grid item>
                                                                <NumButton variant='contained'
                                                                           onClick={() => this.onNumPressed(3)}>3</NumButton>
                                                                <NumButton variant='contained'
                                                                           onClick={() => this.onNumPressed(2)}>2</NumButton>
                                                                <NumButton variant='contained'
                                                                           onClick={() => this.onNumPressed(1)}>1</NumButton>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item>
                                                        <PlusButton variant='contained'
                                                                    onClick={this.onPlusPressed}>+</PlusButton>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item>
                                                <Grid container direction='row'>
                                                    <Grid item>
                                                        <NumButton variant='contained'
                                                                   onClick={this.onZeroPressed}>0</NumButton>
                                                        <NumButton variant='contained'
                                                                   onClick={this.onDecimalPointPressed}>.</NumButton>
                                                    </Grid>
                                                    <Grid item>
                                                        <EqualsButton variant='contained'
                                                                      aria-controls="choose-link"
                                                                      onClick={this.onEqualsPressed}
                                                                      aria-haspopup="true"
                                                        >=</EqualsButton>
                                                        <Menu
                                                            id="choose-link"
                                                            anchorEl={this.state.anchorEl}
                                                            keepMounted
                                                            open={Boolean(this.state.anchorEl)}
                                                            onClose={this.closeMenu}
                                                        >
                                                            <ListSubheader>choose url and/or method</ListSubheader>
                                                            <Divider/>
                                                            <MenuItem onClick={() => this.onLinkChose(1)}
                                                                      disabled={countOccurrence(this.state.inputs ? this.state.inputs.toString() : ' ', '+') > 1}>get:
                                                                /math/add/a/b</MenuItem>
                                                            <MenuItem onClick={() => this.onLinkChose(2)}>get:
                                                                /math/add?a=a&b=b</MenuItem>
                                                            <MenuItem onClick={() => this.onLinkChose(3)}>post:
                                                                /math/add/</MenuItem>
                                                        </Menu>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Input
                                            InputProps={{
                                                style: {
                                                    width: '286px',
                                                    height: '212px'
                                                },
                                                readOnly: true,
                                                endAdornment: <InputAdornment position='end'>
                                                    {this.state.loading && <CircularProgress size={200}/>}
                                                </InputAdornment>
                                            }}
                                            disabled={this.state.loading}
                                            rowsMax={4}
                                            variant='outlined'
                                            fullWidth
                                            id={'inputs'}
                                            label={'Inputs'}
                                            name={'inputs'}
                                            helperText={this.state.wrong}
                                            error={this.state.wrong !== ''}
                                            value={this.state.inputs}/>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Container>
                </main>
            </React.Fragment>
        );
    }
}