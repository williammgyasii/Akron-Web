import React, { useState } from "react";
import { Menu, MenuItem, Button } from "@mui/material";
import { styled } from "@mui/system";
import { motion } from "framer-motion";
import { IoChevronDown } from "react-icons/io5";

const statusOptions = [
  { key: "to-do", label: "To-Do", color: "gray" },
  { key: "in-progress", label: "In-Progress", color: "blue" },
  { key: "done", label: "Done", color: "green" },
  { key: "approved", label: "Approved", color: "purple" },
];

const CustomButton = styled(Button)(({ color }) => ({
  display: "flex",
  alignItems: "center",
  border: "1px solid #d9d9d9",
  borderRadius: "4px",
  padding: "2px 4px",
  backgroundColor: "#fff",
  position: "relative",
  "&.focus": {
    outline: "none",
  },
  width: "100%", // Width should adjust based on content
  "& .status-dot": {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    display: "inline-block",
    backgroundColor: color,
    marginRight: "8px",
  },
}));

const TaskStatusDropdown = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState({
    label: "Select Status",
    color: "transparent",
  });

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (key) => {
    const selectedOption = statusOptions.find((option) => option.key === key);
    if (selectedOption) {
      setSelectedStatus({
        key: selectedOption.key,
        label: selectedOption.label,
        color: selectedOption.color,
      });
    }
    handleClose();
  };

  return (
    <>
      <CustomButton
        aria-controls={open ? "status-menu" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        sx={{ color: selectedStatus?.color }}
      >
        <span
          className="status-dot"
          style={{ backgroundColor: selectedStatus.color }}
        />
        {selectedStatus?.label} <IoChevronDown />
      </CustomButton>
      <Menu
        id="status-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: "auto%", // Make dropdown width adjust based on content
          },
        }}
      >
        {statusOptions.map((status, index) => (
          <motion.div
            key={status.key}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
          >
            <MenuItem onClick={() => handleMenuItemClick(status.key)}>
              <span
                style={{
                  backgroundColor: "red",
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  display: "inline-block",
                  backgroundColor: status.color,
                  marginRight: "8px",
                }}
              />
              {status.label}
            </MenuItem>
          </motion.div>
        ))}
      </Menu>
    </>
  );
};

export default TaskStatusDropdown;
