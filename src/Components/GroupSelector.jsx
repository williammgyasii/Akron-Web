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
} from "@mui/material";
import {
  selectGroupID,
  selectGroups,
  setPrefferedGroup,
  setSelectedGroupID,
} from "../Redux/Slices/Groups/groupsSlice";
import CustomDropdown from "./CustomDropdown";

const GroupSelector = ({ onSelectGroup, customStyles }) => {
  const dispatch = useDispatch();
  const groups = useSelector(selectGroups);
  const groupsStatus = useSelector((state) => state.groups.status);
  const selectedGroup = useSelector(selectGroupID);
  const [groupError, setGroupError] = useState(false);

  console.log(groups, selectedGroup);

  const handleGroupChange = (event) => {
    dispatch(setSelectedGroupID(event.target.value));
    setGroupError(event.target.value === "");
  };

  return (
    <>
      {groupsStatus === "loading" && <CircularProgress />}
      {groupsStatus === "failed" && (
        <Typography color="error">Failed to load groups</Typography>
      )}
      {groupsStatus === "succeeded" && (
        <CustomDropdown
          label="Select Group"
          options={groups}
          value={selectedGroup}
          onChange={handleGroupChange}
          error={groupError}
          helperText={groupError ? "Please select a category" : ""}
        />
      )}
    </>
  );
};

export default GroupSelector;
