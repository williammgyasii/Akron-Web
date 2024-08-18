// src/components/TaskForm.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  useTheme,
  Box,
} from "@mui/material";
import { addTask } from "../Redux/Slices/Tasks/tasksSlice";
import { selectCurrentUser } from "../Redux/Slices/Users/UsersSlice";
import GroupSelector from "./GroupSelector";
import { openSnackbar } from "../Redux/Slices/System/systemSlice";
import CustomTitles from "./CustomTitles";
import CustomFormInput from "./CustomFormInput";
import SideBySideLayout from "../Layouts/SideBySide";
import CustomButton from "./CustomButton";
import { MdFormatListBulletedAdd } from "react-icons/md";

const TaskForm = ({ groupId, handleClose }) => {
  const dispatch = useDispatch();
  const users = useSelector(selectCurrentUser); // Assuming currentUser contains user info
  const selectPrefferedGroupId = useSelector(
    (state) => state.groups.selectedGroupId
  );
  const theme = useTheme();
  const error = useSelector((state) => state.tasks.error);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskStart, setTaskStart] = useState(null);
  const [taskDue, setTaskDue] = useState(null);
  const showError = () => {
    dispatch(
      openSnackbar({ message: "This is an error!", severity: "success" })
    );
  };

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

    // setTaskData({
    //   name: "",
    //   description: "",
    //   dueDate: "",
    //   assignedTo: users.uid,
    // });
    // //UPLOADING TO THE CLOUD
    // console.log(taskData);
    // dispatch(addTask({ groupId: selectPrefferedGroupId, taskData }));
  };

  return (
    <Container
      sx={{
        display: "flex",
        // justifyContent: "center",
        // alignItems: "center",
        flexDirection: "column",
      }}
      disableGutters
    >
      <CustomTitles
        customStyles={{ textTransform: "none", marginBottom: 2 }}
        weightFont={"regular"}
        variant="text_base"
        gutterBottom
        color={theme.palette.secondary.main}
      >
        Add New Task
      </CustomTitles>
      <Box component="form" onSubmit={handleSubmit}>
        <CustomFormInput
          label="Task Title"
          name="taskTitle"
          // value={formValues.password}
          // onChange={handleInputChange}
          // error={errors.password}
          // helperText={helperTexts.password}
        />
        <SideBySideLayout
          customStyles={{ marginTop: 5 }}
          largerLeft
          leftComponent={
            <CustomButton
              sx={{ backgroundColor: theme.palette.error.main }}
              onClick={handleClose}
              variant="minimal"
            >
              Close
            </CustomButton>
          }
          rightComponent={
            <CustomButton
              type="iconOnly"
              leftIcon={MdFormatListBulletedAdd}
              submit
              sx={{ color: "#fff" }}
              variant="primary"
            >
              Create Task
            </CustomButton>
          }
        />
      </Box>
    </Container>
  );
};

export default TaskForm;
