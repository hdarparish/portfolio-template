import React, { useEffect, useState } from "react";
import axios from "axios";
//styles
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";

const HomeDashboard = ({ homePageData, setHomePageData }) => {
  //const [homePageForm, setHomePageForm] = useState(homePageData);
  const updateState = (e) => {
    setHomePageData({
      ...homePageData,
      [e.target.name]: e.target.value,
    });
  };

  const updateHomePage = async (e) => {
    e.preventDefault();
    let result = await axios.post(
      process.env.REACT_APP_API_URL + "home-dashboard",
      { homePageData }
    );
    alert(result.data.message);
  };

  return (
    <div>
      <Typography variant="h2" color="textSecondary" component="p">
        Edit Home Page
      </Typography>
      <form autoComplete="off" onSubmit={updateHomePage}>
        <TextField
          id="standard-basic"
          value={homePageData.title}
          onChange={updateState}
          label="Title"
          name="title"
          InputLabelProps={{
            shrink: true,
          }}
          required
        />
        <TextField
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows={4}
          variant="outlined"
          name="description"
          value={homePageData.description}
          onChange={updateState}
          InputLabelProps={{
            shrink: true,
          }}
          required
        />
        <Button type="submit" variant="contained">
          Save Changes
        </Button>
      </form>
    </div>
  );
};

export default HomeDashboard;
