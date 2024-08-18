// src/components/TaskForm.js
import React, { useState } from "react";
import { Container, useTheme, Box, TextField } from "@mui/material";
import GroupSelector from "./GroupSelector";
import CustomTitles from "./CustomTitles";
import CustomFormInput from "./CustomFormInput";
import CustomButton from "./CustomButton";
import { MdFormatListBulletedAdd } from "react-icons/md";
import AssignToMember from "./AssignToMember";
import dayjs from "dayjs";
import { DatePicker } from "@mui/lab";

const TaskForm = ({ groupId, handleClose }) => {
  const theme = useTheme();
  const [formState, setFormState] = useState({
    taskTitle: { value: "", error: false, helperText: "" },
    taskDescription: { value: "", error: false, helperText: "" },
    startDate: { value: "", error: false, helperText: "" },
    dueDate: { value: "", error: false, helperText: "" },
  });
  const [startDate, setStartDate] = useState(null);
  const [dueDate, setDueDate] = useState(null);

  const today = dayjs(); // Get the current date

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

        <Box
          mt={2}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(newDate) => setStartDate(newDate)}
            minDate={today} // Restrict to future dates only
            renderInput={(params) => <TextField {...params} />}
          />
          {/* <CustomFormInput
            label="Start Date"
            type="date"
            fullWidth
            customStyles={{ fontSize: ".5rem", flexBasis: "35%" }}
            InputLabelProps={{
              shrink: true,
            }}
            value={formState.startDate.value}
            onChange={(e) => handleChange("startDate", e.target.value)}
            error={formState.startDate.error}
            helperText={formState.startDate.helperText}
          /> */}

          <GroupSelector />
        </Box>

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
