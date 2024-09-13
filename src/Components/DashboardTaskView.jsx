import {
  Avatar,
  AvatarGroup,
  Box,
  Checkbox,
  CircularProgress,
  Divider,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { IoAddSharp } from "react-icons/io5";
import CustomTitles from "./CustomTitles";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion"; // Import Framer Motion
import { MoreVert } from "@mui/icons-material";
import { DEFAULT_IMAGE_SRC } from "../Utils/Constants";

function DashboardTaskView({ handleOpenTaskModal }) {
  const theme = useTheme();
  const { PROJECT_TASKS, TASK_SLICE_STATUS } = useSelector(
    (state) => state.tasks
  );
  const [checkedTasks, setCheckedTasks] = useState([]);

  const handleTaskCheck = (taskId) => {
    setCheckedTasks((prevCheckedTasks) =>
      prevCheckedTasks.includes(taskId)
        ? prevCheckedTasks.filter((id) => id !== taskId)
        : [...prevCheckedTasks, taskId]
    );
  };

  // Framer Motion variants for staggering effect
  const listVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 9, // Stagger effect
      },
    },
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: theme.palette.background.paper,
        borderRadius: "10px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        padding: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <CustomTitles
          color={theme.palette.secondary.main}
          variant="text_base"
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
              backgroundColor: theme.palette.primary.dark800,
            },
          }}
        >
          <IoAddSharp size={10} />
        </IconButton>
      </Box>
      <Box sx={{}}>
        <List
          component={motion.div}
          variants={listVariants}
          initial="hidden"
          animate="show"
        >
          {PROJECT_TASKS.map((task) => (
            <AnimatePresence key={task.id}>
              <TaskCheckboxView
                key={task.id}
                task={task}
                checkedTasks={checkedTasks}
                onTaskCheck={handleTaskCheck}
              />
            </AnimatePresence>
          ))}
        </List>
      </Box>
    </Box>
  );
}

// Variants for animating each task item
const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const TaskCheckboxView = ({ task, checkedTasks, onTaskCheck }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Truncate task description to show only a few characters with ellipsis
  const truncatedDescription =
    task.taskDescription.length > 50
      ? task.taskDescription.substring(0, 50) + "..."
      : task.taskDescription;

  return (
    <motion.li
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      <ListItem
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          borderRadius: "10px",
          my: 1,
          backgroundColor: "#fff",
          px: 1,
          border: "1px solid #e0e0e0",
        }}
        disableGutters
      >
        {/* Top row: Checkbox, Task Title, and 3 Dots Menu */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Checkbox
              checked={checkedTasks.includes(task.id)}
              onChange={() => onTaskCheck(task.id)}
            />
            <Typography sx={{ fontWeight: "bold" }} variant="body1">
              {task.taskName}
            </Typography>
          </Box>
          <IconButton onClick={handleMenuOpen}>
            <MoreVert />
          </IconButton>
          {/* Task Status Dropdown Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>To-Do</MenuItem>
            <MenuItem onClick={handleMenuClose}>In-Progress</MenuItem>
            <MenuItem onClick={handleMenuClose}>Completed</MenuItem>
            <MenuItem onClick={handleMenuClose}>Approved</MenuItem>
          </Menu>
        </Box>

        {/* Task Description */}
        <Typography
          variant="body2"
          sx={{ color: "gray", mt: 1, wordWrap: "break-word" }}
        >
          {truncatedDescription}
        </Typography>
        {/* Bottom row: Task Date and Avatars */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
          }}
        >
          {/* Task Due Date */}
          <Typography variant="body2" sx={{ color: "gray" }}>
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </Typography>
          <Typography variant="body2" sx={{ color: "gray" }}>
            <motion.span
              style={{
                width: "10px",
                height: "10px",
                backgroundColor: "red",
                borderRadius: "50%",
              }}
            />
            {task.status}
          </Typography>

          {/* Assignees' Avatars */}
          <AvatarGroup max={4} sx={{ justifyContent: "flex-end" }}>
            {task.assignees.map((assignee) => (
              <Avatar
                // sizes="4"
                sx={{ width: "30px", height: "30px" }}
                key={assignee.id}
                alt={assignee.name}
                src={assignee.profilePicture || DEFAULT_IMAGE_SRC}
              />
            ))}
          </AvatarGroup>
        </Box>
      </ListItem>
    </motion.li>
  );
};

export default DashboardTaskView;
