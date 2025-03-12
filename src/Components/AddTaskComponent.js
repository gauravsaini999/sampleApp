import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { Grid, TextField, Button, FormControl, Divider } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',
    },
}));

function UploadButtons() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
            />
            <label htmlFor="contained-button-file">
                <Button variant="contained" color="primary" component="span">
                    Upload
                </Button>
            </label>
        </div>
    );
}

function UploadForm() {
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        axios.post('/upload', formData, {
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                setUploadProgress(percentCompleted);
            }
        }).then(response => {
            console.log(response);
        }).catch(error => {
            console.error(error);
        });
    };

    return (
        <form>
            <UploadButtons variant="contained" color="primary" component="span">
                Upload Profile Photo
            </UploadButtons>
            <LinearProgress variant="determinate" value={uploadProgress} />
        </form>
    );
}

const AddTaskComponent = () => {
    const [state, setState] = useState({
        creationDate: new Date(),
        heading: "",
        description: "",
        imageUrl: ""
    })

    const handleDateChange = (date) => {
        setState(prev => ({...prev, creationDate: date}))
    };

    const handleChange = (e) => {
        setState(prev => ({...state, [e.target.name]: e.target.value}))
    }

    const handleSave = (e) => {
        e.preventDefault();
        console.log(state);
    }

    return (
        <React.Fragment>
            <Grid
                container
                spacing={6}
                direction="row"
                justifyContent="center"
                alignItems="center"
                alignContent='space-around'
            >
                <Grid container item xs={12} spacing={3} justifyContent='flex-start'>
                    <Grid item xs={12} sm={12} md={6}>
                        <FormControl fullWidth>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
                                    label="Schedule Task"
                                    value={state["creationDate"]}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={10}>
                        <FormControl fullWidth>
                            <TextField label="Enter your task's heading" variant="outlined" size="small" onChange={handleChange} name="heading" />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={10}>
                        <FormControl fullWidth>
                            <TextField label="Give a brief description for your task" variant="outlined" size="small" onChange={handleChange} name="description" />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={10}>
                        <FormControl fullWidth>
                            {/* <UploadForm /> */}
                            <TextField label="Give a url for your picture" variant="outlined" size="small" onChange={handleChange} name="imageUrl" />
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container item xs={12} spacing={2} justifyContent='center'>
                    <Grid item xs={6} sm={4}>
                        <FormControl fullWidth>
                            <Button variant="contained" color="primary" size="medium" onClick={handleSave}>
                                Save Task
                            </Button>
                        </FormControl>
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default React.memo(AddTaskComponent);