import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentProject,
  selectGroupProjects,
  setSelectedProject,
} from "../Redux/Slices/Groups/groupsSlice";
import CustomButton from "./CustomButton";
import { IoAddSharp } from "react-icons/io5";
import CustomTitles from "./CustomTitles";
import {
  selectIsDrawerOpened,
  showModal,
} from "../Redux/Slices/System/systemSlice";
import { getRandomAvatarColor } from "../Utils/randomAvatarColors";

const StyledListItemButton = styled(ListItemButton)(({ theme, selected }) => ({
  padding: "5px 10px",
  borderRadius: theme.shape.borderRadius,
  transition: "background-color 0.3s, box-shadow 0.3s",
  "&.Mui-selected": {
    backgroundColor: theme.palette.primary.main,
    color: "white",
  },
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
  },
}));

const ProjectNavList = ({ selectedProject, onSelectProject }) => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const projects = useSelector(selectGroupProjects);
  const isDrawerOpen = useSelector(selectIsDrawerOpened);
  const displayProjects = projects.slice(0, 4); // Limit to first 3 projects
  const currentProject = useSelector(selectCurrentProject);
  const theme = useTheme();
  const dispatch = useDispatch();

  const handleViewAllClick = () => {
    navigate("projects"); // Adjust the path to your projects page
  };
  const handleProjectClick = (projectId, project) => {
    // dispatch(setActiveProject(projectId));
    dispatch(setSelectedProject(project));
    navigate(`projects/${projectId}`); // Adjust the path to your project details page
  };

  const handleOpen = () => dispatch(showModal("createProject"));

  if (projects.length === 0) {
    return (
      <Box p={2} textAlign="center">
        <Typography variant="body1">No projects available.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{}}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <CustomTitles
          color={theme.palette.primary.white}
          variant="text_xs"
          // capitalize="none"
          weightFont={"medium"}
          customStyles={{
            textTransform: "none",
            display: "block",
            zIndex: 1,
            p: 1,
          }}
        >
          Projects
        </CustomTitles>
        <IconButton
          onClick={handleOpen}
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: "white",
            borderRadius: 1,
            p: 0.5,
            "&:hover": {
              backgroundColor: theme.palette.primary.dark800, // Slightly lighter black on hover
            },
          }}
        >
          <IoAddSharp size={10} />
        </IconButton>
      </Box>
      <List sx={{ mt: "-10px" }}>
        {displayProjects.map((project) => {
          // console.log(project?.id);
          const projectInitial = project.projectName.charAt(0).toUpperCase();
          return (
            <StyledListItemButton
              selected={currentProject?.id === project.id}
              key={project.projectName}
              // onClick={() => onSelectProject(project.id)}
              onClick={() => handleProjectClick(project.id, project)}
            >
              <Avatar
                sx={{
                  bgcolor: getRandomAvatarColor(),
                  width: 30,
                  height: 30,
                  marginRight: 1,
                }}
              >
                {projectInitial}
              </Avatar>
              {isDrawerOpen && (
                <ListItemText
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: "0.855rem", // Adjust font size here
                    },
                  }}
                  primary={project.projectName}
                />
              )}
            </StyledListItemButton>
          );
        })}
      </List>
      {projects.length > 3 && (
        <>
          <Divider />

          {isDrawerOpen && (
            <CustomButton
              size="small"
              variant="primary"
              color="primary"
              onClick={handleViewAllClick}
            >
              View All Projects
            </CustomButton>
          )}
        </>
      )}
    </Box>
  );
};

export default ProjectNavList;
