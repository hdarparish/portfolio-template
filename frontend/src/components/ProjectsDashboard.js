import React, { useState } from "react";
//styles
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

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
  projectList: {
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

const initialProjectState = {
  title: "",
  briefDescription: "",
  description: "",
  projectURL: "",
};

const ProjectsDashboard = (projectData) => {
  const classes = useStyles();
  const [projectForm, setProjectForm] = useState(initialProjectState);

  const projectListForm = (e) => {
    let projectId = e.target.parentElement.parentNode.id;
    let result = projectData.filter((item) => item._id === projectId)[0];
    setProjectForm(result);
  };
  return (
    <Box display="flex" flexWrap="wrap">
      <List className={classes.projectList}>
        <li className={classes.listSection}>
          <ul className={classes.ul}>
            <ListItem button>
              <ListItemText
                primary="Add Project"
                onClick={() => {
                  setProjectForm(initialProjectState);
                }}
              />
            </ListItem>
            {projectData &&
              projectData.map((item) => (
                <ListItem button key={item._id} id={item._id}>
                  <ListItemText
                    primary={`Item ${item.title}`}
                    secondary={item._id}
                    onClick={projectListForm}
                  />
                </ListItem>
              ))}
          </ul>
        </li>
      </List>
      <Box flexGrow="1">
        <Typography variant="h2" color="textSecondary" component="p">
          Project
        </Typography>
        <form noValidate autoComplete="off">
          <TextField
            id="standard-basic"
            label="Title"
            InputLabelProps={{
              shrink: true,
            }}
            value={projectForm.title}
          />
          <TextField
            id="outlined-multiline-static"
            label="Brief Description"
            multiline
            rows={4}
            variant="outlined"
            name="description"
            InputLabelProps={{
              shrink: true,
            }}
            value={projectForm.briefDescription}
          />
          <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={4}
            variant="outlined"
            name="description"
            InputLabelProps={{
              shrink: true,
            }}
            value={projectForm.description}
          />
          <TextField
            id="outlined-multiline-static"
            label="Project URL"
            multiline
            rows={2}
            variant="outlined"
            name="description"
            InputLabelProps={{
              shrink: true,
            }}
            value={projectForm.projectURL}
          />
          <Button type="submit" variant="contained">
            Save Changes
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default ProjectsDashboard;
