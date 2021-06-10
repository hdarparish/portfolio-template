import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import axios from "axios";

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

const initialState = {
  name: "",
  email: "",
  message: "",
};

const Contact = () => {
  const classes = useStyles();
  const [contactInfo, setContactInfo] = useState(initialState);

  const submitContact = async (e) => {
    e.preventDefault();
    let result = await axios.post(process.env.REACT_APP_API_URL + "contact", {
      contactInfo,
    });
    alert(result.data.message);
    setContactInfo(initialState);
  };

  const handleInputChange = (e) => {
    setContactInfo({
      ...contactInfo,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={classes.root}>
      <div>
        <Typography variant="h2" color="textSecondary" component="p">
          Send me a message
        </Typography>
      </div>
      <form onSubmit={submitContact} autoComplete="off">
        <div>
          <TextField
            required
            id="standard-required"
            name="name"
            value={contactInfo.name}
            onChange={handleInputChange}
            label="Name"
          />
          <TextField
            required
            id="standard-required"
            name="email"
            value={contactInfo.email}
            onChange={handleInputChange}
            label="Email"
          />
          <TextField
            id="outlined-multiline-static"
            label="Message"
            multiline
            rows={4}
            variant="outlined"
            name="message"
            value={contactInfo.message}
            onChange={handleInputChange}
            required
          />
        </div>
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Contact;
