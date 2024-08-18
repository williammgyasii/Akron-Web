// src/components/TaskForm.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Button, Container, Typography, Grid } from "@mui/material";
import { addTask } from "../Redux/Slices/Tasks/tasksSlice";
import { selectCurrentUser } from "../Redux/Slices/Users/UsersSlice";
import GroupSelector from "./GroupSelector";

const TaskForm = ({ groupId,handleClose }) => {
  const dispatch = useDispatch();
  const users = useSelector(selectCurrentUser); // Assuming currentUser contains user info
  const selectPrefferedGroupId = useSelector(
    (state) => state.groups.selectedGroupId
  );

  const [taskData, setTaskData] = useState({
    name: "",
    description: "",
    dueDate: "",
    assignedTo: users.uid,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({
      ...taskData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setTaskData({
      name: "",
      description: "",
      dueDate: "",
      assignedTo: users.uid,
    });
    //UPLOADING TO THE CLOUD
    console.log(taskData);
    dispatch(addTask({ groupId: selectPrefferedGroupId, taskData }));
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Add New Task
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Task Name"
              name="name"
              value={taskData.name}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={taskData.description}
              onChange={handleChange}
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Due Date"
              name="dueDate"
              type="date"
              value={taskData.dueDate}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Add Task
            </Button>
          </Grid>
        </Grid>
      </form>
      <Button onClick={handleClose} variant="contained">
        Close
      </Button>
    </Container>
  );
};

export default TaskForm;
