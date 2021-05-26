import React, { useEffect, useState } from "react";
import axios from "axios";
//styles
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Avatar from "../img/avatar.png";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDesription] = useState("");
  const getData = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_API_URL);
      console.log(response.data);
      setTitle(response.data.title);
      setDesription(response.data.description);
    } catch (err) {
      //add alert error
      console.log(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <Box
        display="flex"
        flexWrap="wrap"
        alignItems="center"
        justifyContent="space-around"
        p={2}
        m={1}
        bgcolor="grey.300"
        boxShadow={3}
        style={{ minHeight: "80vh" }}
      >
        <Box p={5} flexGrow={1}>
          <Typography variant="h1" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h3" gutterBottom>
            {description}
          </Typography>
        </Box>

        <Box p={1} flexGrow={1} textAlign="end">
          <img src={Avatar} alt="profile avatar" />
        </Box>
      </Box>
      {/*       <Box display="flex" flexDirection="row" className={classes.intro}>
        <Box
          component="h4"
          display="inline"
          p={1}
          m={1}
          bgcolor="background.paper"
        >
          inline
        </Box>
        <Typography variant="h4" gutterBottom>
          h4. Heading
        </Typography>
        <Typography variant="body2" gutterBottom>
          h2. Heading
        </Typography>
        <img src={Avatar}> </img>
      </Box> */}
    </div>
  );
};

export default Home;
