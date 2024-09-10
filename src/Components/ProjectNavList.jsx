import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  CircularProgress,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "./CustomButton";
import {
  selectIsDrawerOpened,
  showModal,
} from "../Redux/Slices/System/systemSlice";
import { getRandomAvatarColor } from "../Utils/randomAvatarColors";
import {
  FETCH_PROJECTS_PER_GROUP,
  FETCH_USER_PROJECTS,
  setActiveProject,
} from "../Redux/Slices/Projects/projectsSlice";
import { selectCurrentUser } from "../Redux/Slices/Users/UsersSlice";

const ProjectNavList = ({ selectedProject, onSelectProject }) => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const {
    PROJECT_SLICE_ISLOADING,
    PROJECT_SLICE_STATUS,
    PROJECT_SLICE_ERROR,
    ACTIVE_PROJECT,
    PROJECTS,
  } = useSelector((state) => state.projects);
  const isDrawerOpen = useSelector(selectIsDrawerOpened);
  const displayProjects = PROJECTS.slice(0, 5); // Limit to first 3 projects

  const currentUser = useSelector(selectCurrentUser);
  const currentGroup = useSelector(
    (state) => state.groups.CURRENT_GROUP_DETAILS
  );

  const theme = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentGroup ) {
      dispatch(FETCH_PROJECTS_PER_GROUP(currentGroup?.id));
    }
  }, [dispatch]);

  const handleViewAllClick = () => {
    navigate("projects"); // Adjust the path to your projects page
  };
  const handleProjectClick = (projectId, project) => {
    dispatch(setActiveProject(project));
    navigate(`projects/${projectId}`); // Adjust the path to your project details page
  };

  if (PROJECTS.length === 0) {
    return (
      <Box p={2} textAlign="center">
        <Typography variant="body1">No projects available.</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      {PROJECT_SLICE_STATUS === "loading" && <CircularProgress />}
      {PROJECT_SLICE_STATUS === "failed" && (
        <Typography color="error">{PROJECT_SLICE_ERROR}</Typography>
      )}
      {PROJECT_SLICE_STATUS === "completed" && (
        <List sx={{ mt: "-10px", width: "100%" }}>
          {displayProjects.map((project) => {
            // console.log(project?.id);
            const projectInitial = project?.projectName
              ?.charAt(0)
              .toUpperCase();
            return (
              <StyledListItemButton
                selected={ACTIVE_PROJECT?.id === project.id}
                key={project.id}
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
          {PROJECTS.length > 3 && (
            <>
              <Divider />

              {isDrawerOpen && (
                <CustomButton
                  size="small"
                  variant="primary"
                  color="primary"
                  onClick={handleViewAllClick}
                  sx={{ color: "#fff", marginTop: "10px" }}
                >
                  View All Projects
                </CustomButton>
              )}
            </>
          )}
        </List>
      )}
    </Box>
  );
};

export default ProjectNavList;

const StyledListItemButton = styled(ListItemButton)(({ theme, selected }) => ({
  padding: "5px 10px",
  borderRadius: theme.shape.borderRadius,
  transition: "background-color 0.3s, box-shadow 0.3s",
  "&.Mui-selected": {
    backgroundColor: theme.palette.primary.dark700,
    color: "white",
  },
  "&:hover": {
    backgroundColor: theme.palette.primary.light400,
  },
}));
