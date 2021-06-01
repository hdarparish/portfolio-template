import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
//styles
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

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

const Dashboard = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [homePageData, setHomePageData] = useState({
    title: "",
    description: "",
  });
  const [projectData, setProjectData] = useState([]);
  const [projectForm, setProjectForm] = useState(initialProjectState);
  const [contactEntries, setContactEntries] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const getDashboard = async () => {
    let result = await axios.get(process.env.REACT_APP_API_URL + "dashboard");

    setHomePageData(result.data.homeData);
    setProjectData(result.data.projectData);
    setContactEntries(result.data.contactEntries);
  };

  const projectListForm = (e) => {
    let projectId = e.target.parentElement.parentNode.id;
    let result = projectData.filter((item) => item._id == projectId)[0];
    setProjectForm(result);
    console.log(projectForm);
  };

  useEffect(() => {
    getDashboard();
  }, []);

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Home page" {...a11yProps(0)} />
          <Tab label="Projects page" {...a11yProps(1)} />
          <Tab label="Contact entries" {...a11yProps(2)} />
          <Tab label="Login user" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} dir={theme.direction}>
        <Typography variant="h2" color="textSecondary" component="p">
          Edit Home Page
        </Typography>
        <form noValidate autoComplete="off">
          <TextField
            id="standard-basic"
            value={homePageData.title}
            label="Title"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={4}
            variant="outlined"
            name="description"
            value={homePageData.description}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button type="submit" variant="contained">
            Save Changes
          </Button>
        </form>
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
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
                {projectData.map((item) => (
                  <ListItem button key={item._id} id={item._id}>
                    <ListItemText
                      primary={`Item ${item.title}`}
                      secondary={item._id}
                      value={item._id}
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
      </TabPanel>
      <TabPanel value={value} index={2} dir={theme.direction}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Message</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contactEntries &&
                contactEntries.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell component="th" scope="row">
                      {new Date().toLocaleDateString()}
                    </TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.message}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
      <TabPanel value={value} index={3} dir={theme.direction}>
        Item four
      </TabPanel>
    </div>
  );
};

export default Dashboard;
