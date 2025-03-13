import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import {
  Popover, AppBar, CssBaseline, Toolbar, Typography, IconButton, Paper, Fab,
  List, ListItem, ListItemAvatar, ListItemText, ListSubheader, Avatar, Snackbar
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import AddTaskComponent from './Components/AddTaskComponent';
import { useSelector, useDispatch } from 'react-redux';
import useInit from './Initialize/useInit';
import { getAllPersistedTasks } from './Store/Reducers/tasksActions';


const useStyles = makeStyles((theme) => ({
  popoverRoot: {
    display: 'flex',
    justifyContent: 'center',
  },
  popoverPaper: {
    [theme.breakpoints.down('sm')]: {
      width: "80%",
      height: "45%",
      marginTop: "5%"
    },
    [theme.breakpoints.up('md')]: {
      width: "35%",
      height: "45%",
      marginTop: "5%"
    },
    padding: theme.spacing(2)
  },
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 50,
  },
  list: {
    marginBottom: theme.spacing(2),
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
}));

if (localStorage.getItem('count') == null && localStorage.getItem('count') !== '0') {
  localStorage.setItem('count', '1');
}

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [openSnack, setOpenSnack] = useState(false);
  const [saveMsg, setSaveMsg] = useState('Null');

  const tasks = useSelector((state) => state.tasks);
  useInit();

  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnack(false);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e, snackMsg) => {
    e.preventDefault();
    setAnchorEl(null);
    if (snackMsg !== "backdropClick") {
      setOpenSnack(true);
      setSaveMsg(snackMsg);
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <React.Fragment>
      <CssBaseline />
      <Paper square className={classes.paper}>
        <Typography className={classes.text} variant="h5" gutterBottom>
          Tasks Manager
        </Typography>
        <List className={classes.list}>
          {tasks.tasks.map(({ id, heading, description, imageUrl }) => (
            <React.Fragment key={id}>
              {id === 1 && <ListSubheader className={classes.subheader}>Today</ListSubheader>}
              {id === 8 && <ListSubheader className={classes.subheader}>Yesterday</ListSubheader>}
              <ListItem button>
                <ListItemAvatar>
                  <Avatar alt="Profile Picture" src={imageUrl} />
                </ListItemAvatar>
                <ListItemText primary={heading} secondary={description} />
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </Paper>
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="open drawer">
            <MenuIcon />
          </IconButton>
          <Fab color="secondary" aria-label="add" className={classes.fabButton} aria-describedby={id} onClick={handleClick}>
            <AddIcon />
          </Fab>
          <Popover
            id={id}
            open={open}
            onClose={handleClose}
            anchorReference={"none"}
            classes={{
              root: classes.popoverRoot,
              paper: classes.popoverPaper
            }}
          >
            <AddTaskComponent handleClose={handleClose} />
          </Popover>
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={openSnack}
            autoHideDuration={6000}
            onClose={handleCloseSnack}
            message={saveMsg}
            action={
              <React.Fragment>
                <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnack}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </React.Fragment>
            }
          />
          <div className={classes.grow} />
          <IconButton color="inherit">
            <SearchIcon />
          </IconButton>
          <IconButton edge="end" color="inherit">
            <MoreIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default App;
