import React from "react";
import {
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  styled,
  ListItemText,
  IconButton,
  Icon,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

// Custom styled components
const StyledSelect = styled(Select)(({ theme, width }) => ({
  width: width || "100%",
  borderRadius: "10px",
  backgroundColor: theme.palette.primary.light400, // Purple background
  color: theme.palette.primary.contrastText, // White text
  "& .MuiSelect-select": {
    display: "flex",
    alignItems: "center",
    padding: "5px 10px",
    color: theme.palette.primary.contrastText, // White text
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: `1px solid ${theme.palette.primary.light400}`, // Light purple border
    borderRadius: "16px",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.primary.light400, // Purple border on hover
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.primary.light400, // Purple border on focus
  },
  "& .MuiSelect-icon": {
    display: "flex",
    alignItems: "center",
    color: theme.palette.primary.contrastText, // White icon
  },
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  backgroundColor: "transparent",
  //   backgroundColor: theme.palette.primary.light, // Light purple background
  color: theme.palette.primary.contrastText, // White text
}));

const MenuItemChip = styled(MenuItem)(({ theme }) => ({}));

const ProjectSelector = ({ options, value, onChange, placeholder, width }) => {
  return (
    <FormControl>
      <InputLabel>{placeholder}</InputLabel>
      <StyledSelect
        value={value}
        onChange={onChange}
        input={<OutlinedInput label={placeholder} />}
        MenuProps={{
          PaperProps: {
            sx: {
              maxHeight: 300,
              width: width || 150,
              borderRadius: "16px",
            },
          },
        }}
        width={width}
      >
        {options.map((option) => (
          <MenuItemChip key={option.id} value={option.id}>
            {option.projectName}
          </MenuItemChip>
        ))}
      </StyledSelect>
    </FormControl>
  );
};

export default ProjectSelector;
