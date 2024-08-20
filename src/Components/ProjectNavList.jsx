import React from "react";
import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  styled,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectGroupProjects } from "../Redux/Slices/Groups/groupsSlice";
import CustomButton from "./CustomButton";

const projects = [
  { projectName: "Cell Ministry" },
  { projectName: "Banku" },
  { projectName: "ShiSha" },
  { projectName: "Cassava" },
];

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  padding: "2px 10px",
  borderRadius: theme.shape.borderRadius,
  transition: "background-color 0.3s, box-shadow 0.3s",
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
  },
  "&:active": {
    backgroundColor: "red",
    boxShadow: theme.shadows[1],
  },
}));

const ProjectNavList = ({}) => {
  const navigate = useNavigate();
  //   const projects = useSelector((state) => state.groups.projects);
  const displayProjects = projects.slice(0, 3); // Limit to first 3 projects

  const handleViewAllClick = () => {
    navigate("projects"); // Adjust the path to your projects page
  };
  const handleProjectClick = (projectId) => {
    navigate(`projects/${projectId}`); // Adjust the path to your project details page
  };

  if (projects.length === 0) {
    return (
      <Box p={2} textAlign="center">
        <Typography variant="body1">No projects available.</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <List>
        {displayProjects.map((project) => (
          <StyledListItemButton
            key={project.projectName}
            onClick={() => handleProjectClick(project.projectName)}
          >
            <ListItemText sx={{fontSize:"12px"}} primary={project.projectName} />
          </StyledListItemButton>
        ))}
      </List>
      {projects.length > 3 && (
        <>
          <Divider />
          <Box textAlign="center" mt={2}>
            <CustomButton
              size="small"
              variant="primary"
              color="primary"
              onClick={handleViewAllClick}
            >
              View All Projects
            </CustomButton>
          </Box>
        </>
      )}
    </Box>
  );
};

export default ProjectNavList;
