// src/components/TaskForm.js
import React, { useState } from "react";
import {
  Container,
  useTheme,
  Box,
  TextField,
  styled,
  Typography,
} from "@mui/material";
import GroupSelector from "./GroupSelector";
import CustomTitles from "./CustomTitles";
import CustomFormInput from "./CustomFormInput";
import CustomButton from "./CustomButton";
import { MdFormatListBulletedAdd } from "react-icons/md";
import AssignToMember from "./AssignToMember";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { selectGroupID } from "../Redux/Slices/Groups/groupsSlice";
import { selectCurrentUser } from "../Redux/Slices/Users/UsersSlice";
import {
  addTaskToGroup,
  selectTaskState,
} from "../Redux/Slices/Tasks/tasksSlice";
import { hideModal } from "../Redux/Slices/System/systemSlice";
import ColorPicker from "./DropdownColorPicker";
import ProjectPicker from "./ProjectPicker";

const DatePickerContainer = styled(DatePicker)(({ theme, variant, size }) => ({
  width: "100%",
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  fontSize: "16px",
  marginTop: "16px",
}));

const AddTaskForm = ({ groupId, handleClose }) => {
  const [formState, setFormState] = useState({
    taskTitle: { value: "", error: false, helperText: "" },
    taskDescription: { value: "", error: false, helperText: "" },
    startDate: { value: null, error: false, helperText: "" },
    taskColor: "",
  });
  const theme = useTheme();
  const today = new Date();
  const dispatch = useDispatch();
  const taskState = useSelector(selectTaskState);
  const selectedGroup = useSelector(selectGroupID);
  const currentUser = useSelector(selectCurrentUser);

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

    // if (!formState.dueDate.value) {
    //   newState.dueDate.error = true;
    //   newState.dueDate.helperText = "Due date is required";
    //   valid = false;
    // }

    setFormState(newState);
    return valid;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Ac");
    if (validateForm()) {
      // Handle valid form submission
      dispatch(
        addTaskToGroup({
          selectedGroup,
          taskData: {
            taskTitle: formState.taskTitle.value,
            taskDescription: formState.taskDescription.value,
            startDate: formState.startDate.value,
            assignedTo: currentUser.userId,
            taskColor: formState.taskColor,
          },
        })
      );
    }
  };

  const handleColorSelect = (color) => {
    setFormState((prevState) => ({
      ...prevState,
      taskColor: color,
    }));
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
      disableGutters
    >
      <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
        <CustomTitles
          customStyles={{ textTransform: "none", }}
          weightFont={"regular"}
          variant="text_base"
          gutterBottom
          color={theme.palette.secondary.main}
        >
          Add New Task
        </CustomTitles>
        <ProjectPicker size={"small"} />
      </Box>

      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
        component="form"
        onSubmit={handleSubmit}
      >
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

        {/* <Typography>ac</Typography> */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <AssignToMember />
          <ColorPicker
            label={"Task Color"}
            selectedColor={formState.taskColor}
            onSelectColor={handleColorSelect}
          />
        </Box>

        <Box
          display={"flex"}
          width={"100%"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <GroupSelector darkLabel formState />
          <DatePickerContainer
            selected={formState.startDate.value}
            onChange={(date) => handleChange("startDate", date)}
            minDate={today} // Restrict to future dates
            placeholderText="Select a start date"
            dateFormat="yyyy/MM/dd"
            className="date-picker" // Custom class for styling
          />
        </Box>

        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            width: "50%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {taskState === "idle" || taskState === "succeeded" ? (
            <CustomButton
              sx={{
                flexBasis: "30%",
                marginRight: "10px",
              }}
              onClick={() => dispatch(hideModal())}
              variant="secondary"
              size="small"
            >
              Cancel
            </CustomButton>
          ) : null}

          <CustomButton
            // type="iconOnly"
            loadingButton={taskState === "loading"}
            leftIcon={MdFormatListBulletedAdd}
            submit
            size="small"
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

export default AddTaskForm;
