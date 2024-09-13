import {
  Box,
  Checkbox,
  CircularProgress,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { IoAddSharp } from "react-icons/io5";
import CustomTitles from "./CustomTitles";
import { useSelector } from "react-redux";
import styled from "styled-components";

function DashboardTaskView({ handleOpenTaskModal }) {
  const theme = useTheme();
  const { PROJECT_TASKS, TASK_SLICE_STATUS } = useSelector(
    (state) => state.tasks
  );
  console.log(TASK_SLICE_STATUS);
  const [checkedTasks, setCheckedTasks] = useState([]);

  const handleTaskCheck = (taskId) => {
    // Toggle checked state of the task
    setCheckedTasks((prevCheckedTasks) =>
      prevCheckedTasks.includes(taskId)
        ? prevCheckedTasks.filter((id) => id !== taskId)
        : [...prevCheckedTasks, taskId]
    );
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "red",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          backgroundColor: "yellow",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <CustomTitles
          color={theme.palette.secondary.main}
          variant="text_base"
          // capitalize="none"
          weightFont={"medium"}
          customStyles={{
            textTransform: "none",
            display: "block",
            zIndex: 1,
            p: 1,
          }}
        >
          Tasks
        </CustomTitles>
        <IconButton
          onClick={handleOpenTaskModal}
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: "white",
            borderRadius: 1,
            "&:hover": {
              backgroundColor: theme.palette.primary.dark800, // Slightly lighter black on hover
            },
          }}
        >
          <IoAddSharp size={10} />
        </IconButton>
      </Box>
      <Box sx={{}}>
        {/* {TASK_SLICE_STATUS === "loading" && <CircularProgress />} */}
        <List>
          {PROJECT_TASKS.map((task) => {
            return (
              <TaskCheckboxView
                key={task.id}
                task={task}
                checkedTasks={checkedTasks}
                onTaskCheck={handleTaskCheck}
              />
            );
          })}
        </List>
      </Box>
    </Box>
  );
}

const TaskCheckboxView = ({ task, checkedTasks, onTaskCheck }) => {
  return (
    <ListItem sx={{ display: "flex", flexDirection: "row",alignItems:"center" }} disableGutters>
      <Checkbox
        checked={checkedTasks.includes(task.id)}
        onChange={() => onTaskCheck(task.id)}
      />
      <ListItemText primary={task.id} />
    </ListItem>
  );
};

export default DashboardTaskView;
