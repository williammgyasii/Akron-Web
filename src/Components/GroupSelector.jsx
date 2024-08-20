// src/components/GroupSelector.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  TextField,
  Button,
  Container,
  Typography,
  MenuItem,
  Select,
  CircularProgress,
  FormControl,
  InputLabel,
  Box,
  useTheme,
} from "@mui/material";
import {
  clearGroupDetails,
  fetchSelectedGroupDetails,
  selectGroupID,
  selectGroups,
  setPrefferedGroup,
  setSelectedGroupID,
} from "../Redux/Slices/Groups/groupsSlice";
import CustomDropdown from "./CustomDropdown";

const GroupSelector = ({ onSelectGroup, customStyles, ...props }) => {
  const dispatch = useDispatch();
  const groups = useSelector(selectGroups);
  const groupsStatus = useSelector((state) => state.groups.status);
  const selectedGroup = useSelector(selectGroupID);
  const [groupError, setGroupError] = useState(false);
  const theme = useTheme();

  // console.log(groups, selectedGroup);

  const handleGroupChange = (event) => {
    dispatch(setSelectedGroupID(event.target.value));
    if (selectGroupID) {
      dispatch(fetchSelectedGroupDetails(event.target.value));
    } else {
      dispatch(clearGroupDetails());
    }
  };

  return (
    <Box
      display={"flex"}
      width={
        props.size === "small"
          ? "20%"
          : props.size === "fullWidth"
          ? "100"
          : "50%"
      }
      // paddingBottom={1}
      alignItems={"center"}
      justifyContent={"center"}
      // fullWidth={props.fullWidth}
    >
      {groupsStatus === "loading" && (
        <CircularProgress size={15} sx={{ marginTop: 2, color: "red" }} />
      )}
      {groupsStatus === "failed" && (
        <Typography color="error">Failed to load groups</Typography>
      )}
      {groupsStatus === "succeeded" && (
        <CustomDropdown
          disabled={props.formState}
          label="Group"
          labelColor={
            props.darkLabel
              ? theme.palette.secondary.main
              : theme.palette.primary.white
          }
          options={groups}
          value={selectedGroup}
          onChange={handleGroupChange}
          error={groupError}
          helperText={groupError ? "Please select a category" : ""}
        />
      )}
    </Box>
  );
};

export default GroupSelector;
