import React, { useState } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  TextareaAutosize,
  Grid,
  useTheme,
  IconButton,
  Divider,
  Chip,
  Tooltip,
  Tab,
  Tabs,
} from "@mui/material";
import { motion } from "framer-motion";
import { styled } from "@mui/material/styles";
import {
  IoClose,
  IoInformation,
  IoInformationCircleOutline,
  IoStar,
} from "react-icons/io5";
import CustomFormInput from "./CustomFormInput";
import BorderlessInput from "./CustomBorderlessInput";
import CustomBorderlessInput from "./CustomBorderlessInput";
import AssignTo from "./AssignTo";
import { useSelector } from "react-redux";
import { MdOutlineDelete } from "react-icons/md";
import ProjectSelector from "./ProjectSelector";
import MemberSelector from "./MemberSelector";
import { selectCurrentUser } from "../Redux/Slices/Users/UsersSlice";
import { Avatar, DatePicker } from "antd";
import CustomDatePicker from "./CustomDatePicker";
import TaskStatusDropdown from "./TaskStatusDropdown";
import { SettingsInputComponent } from "@mui/icons-material";

// Define animation variants for Framer Motion
const slideInFromRight = {
  hidden: {
    x: "100vw", // Start from right (off-screen)
    opacity: 0,
  },
  visible: {
    x: 0, // Slide to original position
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
  exit: {
    x: "100vw", // Exit to the right again
    opacity: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
};

// Define styled components
const CustomTabs = styled(Tabs)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  "& .MuiTabs-indicator": {
    backgroundColor: "black", // Set the indicator color to black
  },
}));

const CustomTab = styled(Tab)(({ theme }) => ({
  fontSize: "0.875rem", // Smaller font size
  minWidth: "120px", // Smaller width
  padding: "6px 12px", // Smaller padding
  "&.Mui-selected": {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightBold,
    borderBottom: `2px solid ${theme.palette.primary.main}`,
  },
  "&:hover": {
    color: theme.palette.primary.dark,
  },
}));

const CreateTaskModal = ({ isOpen, onClose }) => {
  const theme = useTheme();
  const {
    PROJECT_SLICE_ISLOADING,
    PROJECT_SLICE_STATUS,
    PROJECT_SLICE_ERROR,
    ACTIVE_PROJECT,
    PROJECTS,
    projectMembersDetails,
  } = useSelector((state) => state.projects);
  const currentUser = useSelector(selectCurrentUser);
  const [value, setValue] = useState(0);
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };
  const [taskTitle, setTaskTitle] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const [assigneesId, setAssigneesIds] = useState([]);
  const [status, setStatus] = useState(null);

  const handleActiveProjectChange = (value) => {
    setSelectedValue(value);
  };

  const filteredMembers = projectMembersDetails.filter(
    (member) => member.id !== currentUser.uid
  );

  const handleMemberChange = (event, newValue) => {
    setAssigneesIds(newValue);
  };

  const handleDelete = (memberId) => {
    setAssigneesIds((prev) => prev.filter((member) => member.id !== memberId));
  };

  return (
    <Modal
      BackdropProps={{
        onClick: (e) => e.stopPropagation(),
      }}
      open={isOpen}
      onClose={onClose}
    >
      <OverlayBox>
        <ModalBox
          variants={slideInFromRight} // Use Framer Motion variants
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Toolbar */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              marginBottom: "10px",
            }}
          >
            <IconButton
              sx={{
                "&:hover": {
                  backgroundColor: theme.palette.secondary.main, // No background change on hover
                },
              }}
              onClick={onClose}
            >
              <IoClose color="rgb(113 113 122 )" size={12} />
            </IconButton>

            <span className="text-zinc-500 text-sm">Add a new task</span>

            <IconButton
              sx={{
                // borderRadius: "20px",
                "&:hover": {
                  backgroundColor: theme.palette.secondary.main, // No background change on hover
                },
              }}
              onClick={onClose}
            >
              <IoStar color="rgb(113 113 122 )" size={12} />
            </IconButton>
          </Box>

          <CustomBorderlessInput
            placeholder="Task Title"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />

          {/* ACTIVE PROJECT BOX */}
          <div className="flex w-full text-sm mt-2 items-center">
            <span
              style={{
                color: theme.palette.zinc.dark,
                marginRight: "10px",
                minWidth: "80px",
              }}
            >
              Active Project:
            </span>
            <ProjectSelector
              width={"150px"}
              options={options}
              value={selectedValue}
              onChange={handleActiveProjectChange}

              //   placeholder="Select Options"
            />
            {/* <Chip
              sx={{
                backgroundColor: theme.palette.primary.light400,
                marginLeft: "5px",
                color: "#fff",
                borderRadius: "10px!important",
              }}
              label={ACTIVE_PROJECT?.projectName}
            /> */}
            <Tooltip title="Task will be created in active group">
              <IconButton>
                <IoInformationCircleOutline
                  style={{ color: theme.palette.primary.main }}
                  size={20}
                />
              </IconButton>
            </Tooltip>
          </div>

          <div className="flex w-full h-fit text-sm mt-2 items-center">
            <span
              style={{
                color: theme.palette.zinc.dark,
                marginRight: "10px",
                minWidth: "90px",
              }}
            >
              Assignees
            </span>
            {/* //Only project adminds can assign task fix in future */}
            <MemberSelector
              width
              members={filteredMembers}
              selectedMembers={assigneesId} // Pass selected ids
              handleChange={handleMemberChange} // Pass external handleChange
              handleDelete={handleDelete} // Pass external handleDelete
            />
          </div>

          <div className="flex w-full h-fit text-sm mt-2 items-center z-50">
            <span
              style={{
                color: theme.palette.zinc.dark,
                marginRight: "10px",
                minWidth: "90px",
              }}
            >
              Due Date
            </span>
            {/* //Only project adminds can assign task fix in future */}
            <CustomDatePicker date={dueDate} setDate={setDueDate} />
          </div>

          <div className="flex w-full h-fit text-sm mt-2 items-center z-50">
            <span
              style={{
                color: theme.palette.zinc.dark,
                marginRight: "10px",
                minWidth: "90px",
              }}
            >
              Status
            </span>
            {/* //Only project adminds can assign task fix in future */}
            <TaskStatusDropdown
              status={status}
              setStatus={setStatus}
              mode={"create-task"}
            />
          </div>

          <div className="flex w-full h-fit text-sm mt-2 items-center z-50">
            <span
              style={{
                color: theme.palette.zinc.dark,
                marginRight: "10px",
                minWidth: "90px",
              }}
            >
              Created by:
            </span>
            <Chip
              size="medium"
              // sx={{ fontSize:"1rem" }}
              label={currentUser.firstName + " " + currentUser.lastName}
              avatar={
                <Avatar
                  src={
                    `https://www.tapback.co/api/avatar.webp` ||
                    currentUser.imageUrl
                  }
                />
              }
            />
          </div>

          {/* <Divider sx={{ backgroundColor: "red", width: "100%",alignSelf:"flex-end" }} /> */}

          <Box width={"100%"}>
            <Tabs
              value={value}
              onChange={handleTabChange}
              aria-label="task tabs"
              sx={{ borderBottom: 1, borderColor: "divider" }}
            >
              <Tab
                label="Description"
                icon={<IoInformation />}
                iconPosition="start"
                value={0}
              />
              <Tab
                label="Settings"
                icon={<SettingsInputComponent />}
                iconPosition="start"
                value={1}
              />
            </Tabs>
          </Box>
        </ModalBox>
      </OverlayBox>
    </Modal>
  );
};

export default CreateTaskModal;

// Styled container for the modal content using MUI's styled API
const ModalBox = styled(motion.div)(({ theme }) => ({
  position: "absolute",
  background: "linear-gradient(270deg, #ffffff, #fffff1)",
  borderRadius: theme.shape.borderRadius,
  maxWidth: "450px",
  padding: "10px 15px",
  //   margin: "auto",
  height: "100%",
  right: 10,
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  flexDirection: "column",
  width: "100%",
  boxShadow: theme.shadows[5],
  outline: "none",
}));

const OverlayBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  inset: 0,
  // Dark background overlay
  backgroundColor: "rgba(0, 0, 0, 0.55)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: theme.zIndex.modal,
}));

const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
  { value: "option4", label: "Option 4" },
];
