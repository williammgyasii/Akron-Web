import React, { useState } from "react";
import {
  Modal,
  Box,
  useTheme,
  IconButton,
  Chip,
  Tooltip,
  Tab,
  Tabs,
  Avatar,
} from "@mui/material";
import { motion } from "framer-motion";
import { styled } from "@mui/material/styles";
import {
  IoAddCircle,
  IoClose,
  IoInformation,
  IoInformationCircleOutline,
  IoSettings,
  IoStar,
} from "react-icons/io5";
import CustomBorderlessInput from "./CustomBorderlessInput";
import { useDispatch, useSelector } from "react-redux";
import ProjectSelector from "./ProjectSelector";
import MemberSelector from "./MemberSelector";
import { selectCurrentUser } from "../Redux/Slices/Users/UsersSlice";
import CustomDatePicker from "./CustomDatePicker";
import TaskStatusDropdown from "./TaskStatusDropdown";
import { SettingsTab, TaskDescription } from "./StyledComponents";
import { openSnackbar } from "../Redux/Slices/System/systemSlice";
import { createTask } from "../Redux/Slices/Tasks/tasksSlice";
import CustomButton from "./CustomButton";

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
  // minHeight: "40px",
  height: "50px",
  "& .MuiTabs-indicator": {
    backgroundColor: theme.palette.secondary.main, // Set the indicator color to black
  },
}));

const CustomTab = styled(Tab)(({ theme }) => ({
  fontSize: "0.975rem", // Smaller font size
  textTransform: "capitalize",
  fontFamily: "Inter",
  height: "auto",
  minWidth: "120px", // Smaller width
  padding: "0", // Smaller padding
  "&.Mui-selected": {
    color: theme.palette.secondary.main,
    // fontWeight: theme.typography.fontWeightBold,
    borderBottom: `2px solid ${theme.palette.primary.main}`,
  },
  "&:hover": {
    color: theme.palette.primary.dark,
  },
}));

const tabOptions = [
  {
    key: 0,
    label: "Description",
    icon: <IoInformation />,
    component: TaskDescription,
  },
  {
    key: 1,
    label: "Settings",
    icon: <IoSettings />,
    component: SettingsTab,
  },
];

const CreateTaskModal = ({ isOpen, onClose }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { PROJECTS, projectMembersDetails } = useSelector(
    (state) => state.projects
  );
  const { TASK_SLICE_ISLOADING } = useSelector((state) => state.tasks);
  // console.log(TASK_SLICE_ISLOADING)
  const currentUser = useSelector(selectCurrentUser);
  const [value, setValue] = useState(0);
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [activeProjectId, setActiveProjectId] = useState(PROJECTS[0]?.id);
  const [dueDate, setDueDate] = useState(null);
  const [assigneesId, setAssigneesIds] = useState([]);
  const [status, setStatus] = useState(null);

  //HELPER FUNCTION

  const TabContent = tabOptions.find(
    (option) => option.key === value
  )?.component;

  //FUNCTIONS
  const handleActiveProjectChange = (event) => {
    setActiveProjectId(event.target.value);
  };

  const filteredMembers = projectMembersDetails?.filter(
    (member) => member.id !== currentUser.uid
  );

  const handleMemberChange = (event, newValue) => {
    setAssigneesIds(newValue);
  };

  const handleDelete = (memberId) => {
    setAssigneesIds((prev) => prev.filter((member) => member.id !== memberId));
  };

  const handleTaskSubmit = (event) => {
    event.preventDefault();

    const taskData = {
      taskName: taskTitle,
      taskDescription: taskDesc,
      dueDate: new Date(dueDate), // Format the dueDate before sending
      status: status,
      assignees: assigneesId.map((member) => member.id),
      createdby: currentUser?.uid,
      projectId: activeProjectId,
    };

    dispatch(createTask({ projectId: activeProjectId, taskData }))
      .unwrap()
      .then((result) => {
        dispatch(
          openSnackbar({ message: "Task Created", snackbarState: "info" })
        );
        onClose();
      });
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
          <Box sx={{ width: "100%", position: "relative" }}>
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
                width={"170px"}
                options={PROJECTS}
                value={activeProjectId}
                onChange={handleActiveProjectChange}

                //   placeholder="Select Options"
              />
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
            <Box sx={{ width: "100%", marginTop: "15px" }}>
              <CustomTabs
                value={value}
                onChange={handleTabChange}
                aria-label="task tabs"
              >
                {tabOptions.map((option) => (
                  <CustomTab
                    key={option.key}
                    label={option.label}
                    icon={option.icon}
                    iconPosition="start"
                    value={option.key}
                  />
                ))}
              </CustomTabs>
              <Box sx={{ py: 1 }}>
                {TabContent && (
                  <TabContent setTaskDesc={setTaskDesc} taskDesc={taskDesc} />
                )}
              </Box>
            </Box>

            <Box sx={{ width: "100%", marginLeft: "auto", marginTop: "20px" }}>
              <CustomButton
                isLoading={TASK_SLICE_ISLOADING}
                disabled={TASK_SLICE_ISLOADING}
                onClick={handleTaskSubmit}
                leftIcon={IoAddCircle}
                type="iconLeft"
                variant="secondary"
                sx={{ color: "#fff" }}
              >
                Create Task
              </CustomButton>
            </Box>
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
