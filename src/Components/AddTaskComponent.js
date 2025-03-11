import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { Grid, TextField, Button, FormControl } from '@material-ui/core';

const AddTaskComponent = () => {
    const [selectedDate, setSelectedDate] = React.useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <React.Fragment>
            <Grid
                container
                spacing={2}
                direction="row"
                justifyContent="center"
                alignItems="center"
                alignContent='space-around'
            >
                <Grid item xs>
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
                </Grid>
                <Grid item xs={12}>
                    <FormControl>
                        <TextField label="Task Header" variant="outlined" size="small" />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl>
                        <TextField label="Brief Description" variant="outlined" size="small" />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl>
                        <Button variant="contained" color="primary">
                            Save Task
                        </Button>
                    </FormControl>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default React.memo(AddTaskComponent);