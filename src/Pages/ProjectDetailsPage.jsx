import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  selectIsDrawerOpened,
  setActiveProject,
} from "../Redux/Slices/System/systemSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectGroupProjects } from "../Redux/Slices/Groups/groupsSlice";

const ProjectDetailsPage = () => {
  const isDrawerOpen = useSelector(selectIsDrawerOpened);
  const projects = useSelector(selectGroupProjects);
  const dispatch = useDispatch();
  const { id } = useParams(); // Retrieve the id from the route

  useEffect(() => {
    const project = projects.find((p) => p.id === id);
    const currentProject = 
    // displayProjects.map((project) => {
    //   const projectInitial = project.projectName.charAt(0).toUpperCase();
    //   const isActive = project.id === id;
    //   dispatch(dispatch(setActiveProject(isActive)));
    // });
  }, []);

  return <div>Project Details Page:{id}</div>;
};

export default ProjectDetailsPage;
