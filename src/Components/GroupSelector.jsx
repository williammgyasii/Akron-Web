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
      width={props.size === "small" ? "20%" : "50%"}
      alignItems={"center"}
      justifyContent={"center"}
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
          label="Select Group"
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
