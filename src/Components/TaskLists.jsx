// src/components/TasksList.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  List,
  ListItem,
  ListItemText,
  Container,
  Typography,
  CircularProgress,
} from "@mui/material";
import { fetchTasks } from "../Redux/Slices/Tasks/tasksSlice";

const TasksList = ({ groupId }) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const taskStatus = useSelector((state) => state.tasks.status);
  const currentGroup = useSelector((state) => state.groups.selectedGroupId);

  useEffect(() => {
    if (taskStatus === "idle") {
      console.log(currentGroup);
      // dispatch(fetchTasks(groupId));
    }
  }, [taskStatus, dispatch, groupId]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Task
      </Typography>
      {taskStatus === "loading" && <CircularProgress />}
      {taskStatus === "succeeded" && (
        <List>
          {tasks.map((task) => (
            <ListItem key={task.id}>
              <ListItemText primary={task.name} secondary={task.description} />
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};

export default TasksList;
