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

// Styled container for the modal content using MUI's styled API
const ModalBox = styled(motion.div)(({ theme }) => ({
  position: "absolute",
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  maxWidth: "450px",
  padding: "10px 12px",
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

const CreateTaskModal = ({ isOpen, onClose }) => {
  const theme = useTheme();
  const [taskTitle, setTaskTitle] = useState("");
  const {
    PROJECT_SLICE_ISLOADING,
    PROJECT_SLICE_STATUS,
    PROJECT_SLICE_ERROR,
    ACTIVE_PROJECT,
    PROJECTS,
  } = useSelector((state) => state.projects);

  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (value) => {
    setSelectedValue(value);
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
              style={{ color: theme.palette.zinc.dark, marginRight: "10px" }}
            >
              Active Project:
            </span>
            <ProjectSelector
              width={"150px"}
              options={options}
              value={selectedValue}
              onChange={handleChange}
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

          {/* //Only project adminds can assign task fix in future */}
          <MemberSelector />

          {/* <form style={{ width: "100%" }}>
            <Box mb={3}>
              <TextField label="Task Name" variant="outlined" fullWidth />
            </Box>

            <Box mb={3}>
              <TextareaAutosize
                minRows={4}
                placeholder="Task Description"
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  borderColor: "#ccc",
                }}
              />
            </Box>

            <Box mb={3}>
              <TextField
                label="Due Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Box>

            <Box display="flex" justifyContent="flex-end" gap={2}>
              <Button variant="contained" color="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="contained" color="primary">
                Create Task
              </Button>
            </Box>
          </form> */}
        </ModalBox>
      </OverlayBox>
    </Modal>
  );
};

export default CreateTaskModal;
