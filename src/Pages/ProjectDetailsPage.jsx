import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  selectIsDrawerOpened,
  setActiveProject,
} from "../Redux/Slices/System/systemSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectActiveProject } from "../Redux/Slices/Projects/projectsSlice";

const ProjectDetailsPage = () => {
  const activeProject = useSelector(selectActiveProject);
  const dispatch = useDispatch();
  const { id } = useParams(); // Retrieve the id from the route

  useEffect(() => {
    console.log(activeProject);
  }, [activeProject]);

  return <div>Project Details Page:{id}</div>;
};

export default ProjectDetailsPage;
