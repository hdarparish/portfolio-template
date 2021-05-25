import { AppBar } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import CodeIcon from "@material-ui/icons/Code";

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    background: "#90CAF9",
    color: "black",
    letterSpacing: "3px",
    "& a": {
      textDecoration: "none",
      textAlign: "center",
      letterSpacing: "3px",
      fontSize: "2rem",
    },
    "& span": {
      fontSize: "2rem",
    },
  },
  logo: {
    flexGrow: 0.25,
    justifyContent: "center",
    textAlign: "center",
    fontSize: "large",
  },
  navbar: {
    display: "flex",
    flexGrow: 1,
    color: "black",
  },
});

const Nav = () => {
  const classes = useStyles();
  return (
    <div>
      <AppBar position="static" className={classes.root}>
        <div className={classes.logo}>
          <CodeIcon fontSize="large" />
        </div>
        <List component="nav" className={classes.navbar}>
          <ListItem button component={Link} to="/">
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component={Link} to="/projects">
            <ListItemText primary="Projects" />
          </ListItem>
          <ListItem button component={Link} to="/contact">
            <ListItemText primary="Contact" />
          </ListItem>
        </List>
      </AppBar>
    </div>
  );
};

export default Nav;
