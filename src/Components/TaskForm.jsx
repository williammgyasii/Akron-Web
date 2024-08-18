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
import {
  addTask,
  addTaskToDatabase,
  setTaskError,
} from "../Redux/Slices/Tasks/tasksSlice";
import { selectCurrentUser } from "../Redux/Slices/Users/UsersSlice";
import GroupSelector from "./GroupSelector";
import { openSnackbar } from "../Redux/Slices/System/systemSlice";
import CustomTitles from "./CustomTitles";
import CustomFormInput from "./CustomFormInput";
import SideBySideLayout from "../Layouts/SideBySide";
import CustomButton from "./CustomButton";
import { MdFormatListBulletedAdd } from "react-icons/md";
import AssignToMember from "./AssignToMember";
import CustomDropdown from "./CustomDropdown";

const TaskForm = ({ groupId, handleClose }) => {
  const dispatch = useDispatch();
  const users = useSelector(selectCurrentUser); // Assuming currentUser contains user info
  const selectPrefferedGroupId = useSelector(
    (state) => state.groups.selectedGroupId
  );
  const theme = useTheme();
  const taskError = useSelector((state) => state.tasks.error);

  const [formState, setFormState] = useState({
    taskTitle: { value: "", error: false, helperText: "" },
    taskDescription: { value: "", error: false, helperText: "" },
    startDate: { value: "", error: false, helperText: "" },
    dueDate: { value: "", error: false, helperText: "" },
  });

  const [category, setCategory] = useState("");
  const [categoryError, setCategoryError] = useState(false);

  // Handle input changes
  const handleChange = (field, value) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: {
        ...prevState[field],
        value,
        error: false,
        helperText: "",
      },
    }));
  };

  const showError = () => {
    dispatch(
      openSnackbar({ message: "This is an error!", severity: "success" })
    );
  };

  // Validate the form
  const validateForm = () => {
    let valid = true;
    const newState = { ...formState };

    if (!formState.taskTitle.value) {
      newState.taskTitle.error = true;
      newState.taskTitle.helperText = "Task title is required";
      valid = false;
    }

    if (!formState.taskDescription.value) {
      newState.taskDescription.error = true;
      newState.taskDescription.helperText = "Task Description is required";
      valid = false;
    }

    if (!formState.startDate.value) {
      newState.startDate.error = true;
      newState.startDate.helperText = "Start date is required";
      valid = false;
    }

    if (!formState.dueDate.value) {
      newState.dueDate.error = true;
      newState.dueDate.helperText = "Due date is required";
      valid = false;
    }

    setFormState(newState);
    return valid;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle valid form submission
      console.log("Form submitted successfully", formState);
    }
  };


  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
      disableGutters
    >
      <Box display={"flex"} justifyContent={"space-between"}>
        <CustomTitles
          customStyles={{ textTransform: "none", marginBottom: 2 }}
          weightFont={"regular"}
          variant="text_base"
          gutterBottom
          color={theme.palette.secondary.main}
        >
          Add New Task
        </CustomTitles>
        <AssignToMember />
      </Box>

      <Box component="form" onSubmit={handleSubmit}>
        <CustomFormInput
          label="Task Title"
          fullWidth
          value={formState.taskTitle.value}
          onChange={(e) => handleChange("taskTitle", e.target.value)}
          error={formState.taskTitle.error}
          helperText={formState.taskTitle.helperText}
        />

        <CustomFormInput
          label="Task Description"
          fullWidth
          multiline
          rows={2}
          placeholder="Something small about the task"
          customStyles={{ mt: 1.5 }}
          value={formState.taskDescription.value}
          onChange={(e) => handleChange("taskDescription", e.target.value)}
          error={formState.taskDescription.error}
          helperText={formState.taskDescription.helperText}
        />

        <Box>
          <CustomFormInput
            label="Start Date"
            type="date"
            fullWidth
            customStyles={{ mt: 2.5, fontSize: ".5rem" }}
            InputLabelProps={{
              shrink: true,
            }}
            value={formState.startDate.value}
            onChange={(e) => handleChange("startDate", e.target.value)}
            error={formState.startDate.error}
            helperText={formState.startDate.helperText}
          />

          {/* DUE DATE */}
          {/* <CustomFormInput
            label="Start Date"
            type="date"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            value={formState.startDate.value}
            onChange={(e) => handleChange("startDate", e.target.value)}
            error={formState.startDate.error}
            helperText={formState.startDate.helperText}
          /> */}
        </Box>

        <GroupSelector customStyles={{ mt: 2 }} />

        {/* <CustomDropdown
          label="Category"
          options={categories}
          value={category}
          onChange={handleCategoryChange}
          error={categoryError}
          helperText={categoryError ? "Please select a category" : ""}
        /> */}

        <Box sx={{ marginTop: 1, display: "flex" }}>
          <CustomButton
            sx={{
              backgroundColor: theme.palette.error.main,
              flexBasis: "30%",
              marginRight: "10px",
            }}
            onClick={handleClose}
            variant="minimal"
          >
            Close
          </CustomButton>

          <CustomButton
            // type="iconOnly"
            leftIcon={MdFormatListBulletedAdd}
            submit
            sx={{ color: "#fff" }}
            variant="primary"
          >
            Create Task
          </CustomButton>
        </Box>
      </Box>
    </Container>
  );
};

export default TaskForm;
