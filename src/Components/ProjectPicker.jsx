// src/components/GroupSelector.js
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Typography, CircularProgress, Box } from "@mui/material";
import { selectGroupProjects } from "../Redux/Slices/Groups/groupsSlice";
import CustomDropdown from "./CustomDropdown";

const ProjectPicker = ({
  onSelectGroup,
  customStyles,
  pickerWidth,
  value,
  onChange,
  ...props
}) => {
  const projects = useSelector(selectGroupProjects);
  const groupsStatus = useSelector((state) => state.groups.status);
  const [groupError, setGroupError] = useState(false);

  console.log(projects);

  return (
    <Box
      display={"flex"}
      flexDirection={"row"}
      width={
        props.size === "small"
          ? "20%"
          : props.size === "medium"
          ? "30%"
          : props.size === "fullWidth"
          ? "100"
          : "50%"
      }
      alignItems={"center"}
      justifyContent={"center"}
    >
      {groupsStatus === "loading" && (
        <CircularProgress size={15} sx={{ marginTop: 2, color: "red" }} />
      )}
      {groupsStatus === "failed" && (
        <Typography color="error">Failed to load Projects</Typography>
      )}
      {groupsStatus === "succeeded" && (
        <Box display={"flex"} alignItems={"center"}>
          {/* <span style={{fontSize:"13px",}}>Project</span> */}
          <CustomDropdown
            disabled={props.formState}
            label="Project"
            pickerWidth={"small"}
            options={projects}
            value={value}
            onChange={onChange}
            error={groupError}
          />
        </Box>
      )}
    </Box>
  );
};

export default ProjectPicker;
