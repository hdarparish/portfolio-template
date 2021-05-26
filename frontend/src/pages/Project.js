import React, { useEffect, useState } from "react";
import axios from "axios";
//components
import ProjectCard from "../components/ProjectCard";
//styles
import Box from "@material-ui/core/Box";

const Project = () => {
  const [projects, setProjects] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + "projects"
      );
      setProjects(response.data);
    } catch (err) {
      //add alert error
      console.log(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="flex-start"
      flexWrap="wrap"
    >
      {projects.length > 0 &&
        projects.map((item) => (
          <Box m={1} p={1} bgcolor="background.paper" key={item._id}>
            <ProjectCard data={item} />
          </Box>
        ))}
    </Box>
  );
};

export default Project;
