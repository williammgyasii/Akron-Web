import React from "react";
import { useParams } from "react-router-dom";
import { selectIsDrawerOpened } from "../Redux/Slices/System/systemSlice";
import { useSelector } from "react-redux";
import { selectGroupProjects } from "../Redux/Slices/Groups/groupsSlice";

const ProjectDetailsPage = () => {
  const isDrawerOpen = useSelector(selectIsDrawerOpened);
  const projects = useSelector(selectGroupProjects);
  const displayProjects = projects.slice(0, 3);

  
  const { id } = useParams(); // Retrieve the id from the route
  return <div>Project Details Page:{id}</div>;
};

export default ProjectDetailsPage;
