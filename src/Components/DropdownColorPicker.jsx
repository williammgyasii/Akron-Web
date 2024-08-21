// src/components/DropdownColorPicker.js
import React, { useState } from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  styled,
} from "@mui/material";

// const ColorBox =
//   width: 25px;
//   height: 25px;
//   border-radius: 4px;
//   border: ${(props) =>
//     props.selected ? "2px solid #1890ff" : "1px solid #ccc"};
//   background-color: ${(props) => props.color};
//   cursor: pointer;
// `;

const ColorBox = styled("div")(({ theme, color, selected }) => ({
  width: "25px",
  height: "25px",
  borderRadius: "4px",
  backgroundColor: color,
  cursor: "pointer",
  border: selected
    ? `2px solid ${theme.palette.primary.main}`
    : "1px solid #ccc",
}));

const StyledSelect = styled(Select)(({ theme, value }) => ({
  backgroundColor: value ? "#fff" : theme.palette.background.paper,
  fontSize: "14px",
  width: "150px",
  height: "50px",
  "&:focus": {
    backgroundColor: theme.palette.primary.white,
  },
}));

const StyledFormControl = styled(FormControl)({
  position: "relative",
  display: "flex",
  // flexDirection: "row",
  alignItems: "center",
  "& .MuiInputLabel-root": {
    position: "static",
    transform: "none",
    padding: 0,
    // marginBottom: "8px",
  },
});

const DropdownColorPicker = ({ onSelectColor, label, selectedColor }) => {
  const [open, setOpen] = useState(false);

  const presetColors = [
    "#1890ff",
    "#f5222d",
    "#fa8c16",
    "#52c41a",
    "#13c2c2",
    "#2f54eb",
    "#722ed1",
    "#eb2f96",
    "#faad14",
    "#a0d911",
  ];

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <StyledFormControl>
      <InputLabel>{label}</InputLabel>
      <StyledSelect
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        size="small"
        value={selectedColor}
        renderValue={() =>
          selectedColor ? (
            <Box display="flex" alignItems="center">
              <ColorBox color={selectedColor} selected />
              <Box ml={1}>{selectedColor}</Box>
            </Box>
          ) : (
            "Select a color"
          )
        }
      >
        {presetColors.map((color) => (
          <MenuItem key={color} onClick={() => onSelectColor(color)}>
            <Box display="flex" alignItems="center">
              <ColorBox color={color} selected={color === selectedColor} />
              <Box ml={1}>{color}</Box>
            </Box>
          </MenuItem>
        ))}
      </StyledSelect>
    </StyledFormControl>
  );
};

export default DropdownColorPicker;
