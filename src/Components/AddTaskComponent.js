import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { Grid, TextField, Button, FormControl, Divider } from '@material-ui/core';

const useStyles = makeStyles({
    button: {
        width: 300
    }
});

const AddTaskComponent = () => {
    const classes = useStyles();
    const [selectedDate, setSelectedDate] = React.useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <React.Fragment>
            <Grid
                container
                spacing={7}
                direction="row"
                justifyContent="center"
                alignItems="center"
                alignContent='space-around'
            >
                <Grid container item xs={12} spacing={3} justifyContent='center'>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
                                    label="Schedule Task"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </FormControl>
                    </Grid>
                    <Grid item xs={10} justifyContent='center'>
                        <FormControl fullWidth>
                            <TextField label="Task Header" variant="outlined" size="small" />
                        </FormControl>
                    </Grid>
                    <Grid item xs={10} justifyContent='center'>
                        <FormControl fullWidth>
                            <TextField label="Brief Description of Task" variant="outlined" size="small" />
                        </FormControl>
                    </Grid>
                    <Grid item xs={10} justifyContent='center'>
                        <FormControl fullWidth>
                            <TextField type='file' variant="outlined" size="small" />
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container item xs={12} spacing={3} justifyContent='center'>
                    <Grid item xs={3}>
                        <Divider light />
                        <FormControl fullWidth>
                            <Button variant="contained" color="primary" size="small">
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