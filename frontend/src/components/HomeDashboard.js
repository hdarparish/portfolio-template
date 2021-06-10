import React, { useEffect, useState } from "react";
import axios from "axios";
//styles
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const HomeDashboard = (homePageData) => {
  const [homePageForm, setHomePageForm] = useState(homePageData);

  const updateState = (e) => {
    setHomePageForm({
      ...homePageData,
      [e.target.name]: e.target.value,
    });
  };

  const updateHomePage = async () => {
    let result = await axios.post(
      process.env.REACT_APP_API_URL + "home-dashboard",
      {
        homePageData,
      }
    );
  };

  return (
    <div>
      <Typography variant="h2" color="textSecondary" component="p">
        Edit Home Page
      </Typography>
      <form noValidate autoComplete="off" onSubmit={updateHomePage}>
        <TextField
          id="standard-basic"
          value={homePageForm.title}
          onChange={updateState}
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
          value={homePageForm.description}
          onChange={updateState}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button type="submit" variant="contained">
          Save Changes
        </Button>
      </form>
    </div>
  );
};

export default HomeDashboard;
