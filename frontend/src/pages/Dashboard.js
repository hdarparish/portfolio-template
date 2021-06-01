import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
//components
import UsersDashboard from "../components/UsersDashboard";
import ContactEntriesDashboard from "../components/ContactEntriesDashboard";
import HomeDashboard from "../components/HomeDashboard";
import ProjectsDashboard from "../components/ProjectsDashboard";
//styles
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";

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
}));

const Dashboard = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [homePageData, setHomePageData] = useState({
    title: "",
    description: "",
  });
  const [projectData, setProjectData] = useState([]);

  const [contactEntries, setContactEntries] = useState([]);
  const [userData, setUserData] = useState([]);

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
    setUserData(result.data.loginUsers);
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
        <HomeDashboard homePageData={homePageData} />
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        <ProjectsDashboard projectData={projectData} />
      </TabPanel>
      <TabPanel value={value} index={2} dir={theme.direction}>
        <ContactEntriesDashboard contactEntries={contactEntries} />
      </TabPanel>
      <TabPanel value={value} index={3} dir={theme.direction}>
        <UsersDashboard userData={userData} />
      </TabPanel>
    </div>
  );
};

export default Dashboard;
