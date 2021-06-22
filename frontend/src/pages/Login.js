import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
//styles
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(() => ({
  root: {
    margin: "3rem",
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

const Login = () => {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();
  let location = useLocation();

  const submitLogin = async (e) => {
    e.preventDefault();
    let result = await axios.post(process.env.REACT_APP_API_URL + "login", {
      username,
      password,
    });
    if (result.data.token) {
      localStorage.setItem("token", result.data.token);
      let { from } = location.state || { from: { pathname: "/" } };
      history.replace(from);
    }
  };

  return (
    <div className={classes.root}>
      <div>
        <Typography variant="h2" color="textSecondary" component="p">
          Login
        </Typography>
      </div>
      <form onSubmit={submitLogin} noValidate autoComplete="off">
        <div>
          <TextField
            required
            id="standard-required"
            name="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            label="Username"
          />
          <TextField
            required
            id="standard-password-input"
            type="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            label="Password"
          />
        </div>
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Login;
