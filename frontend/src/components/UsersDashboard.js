import React from "react";

//styles
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
    "& form": {
      display: "flex",
      flexDirection: "column",
      margin: "2rem",
      maxWidth: 500,
      "& .MuiTextField-root": {
        marginTop: "2rem",
        display: "flex",
        flexDirection: "column",
      },
      "& button": {
        marginTop: "2rem",
      },
    },
  },
  userList: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    maxHeight: 500,
  },
  listSection: {
    backgroundColor: "inherit",
  },
  ul: {
    backgroundColor: "inherit",
    padding: 0,
  },
}));

const UsersDashboard = (userData) => {
  const classes = useStyles();
  return (
    <Box display="flex" flexWrap="wrap">
      <List className={classes.userList}>
        <li className={classes.listSection}>
          <ul className={classes.ul}>
            <ListItem button>
              <ListItemText
                primary="Add User"
                onClick={() => {
                  //setProjectForm(initialProjectState);
                }}
              />
            </ListItem>
            {/*  {userData &&
              userData.map((item) => (
                <ListItem button key={item._id} id={item._id}>
                  <ListItemText
                    primary={`Item ${item.username}`}
                    secondary={item._id}
                  />
                </ListItem>
              ))} */}
          </ul>
        </li>
      </List>
      <Box flexGrow="1">
        <Typography variant="h2" color="textSecondary" component="p">
          Users
        </Typography>
        <form noValidate autoComplete="off">
          <TextField
            id="standard-basic"
            label="Username"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            required
            id="standard-password-input"
            type="password"
            name="password"
            label="Password"
            InputLabelProps={{
              shrink: true,
            }}
          />

          <Button type="submit" variant="contained">
            Save Changes
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default UsersDashboard;
