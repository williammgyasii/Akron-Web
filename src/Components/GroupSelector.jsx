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
  fetchGroupMembers,
  fetchProjectsByGroupId,
  fetchSelectedGroupDetails,
  selectGroupID,
  selectGroups,
  selectUserGroups,
  setCurrentGroup,
  setPrefferedGroup,
} from "../Redux/Slices/Groups/groupsSlice";
import CustomDropdown from "./CustomDropdown";
import { FETCH_PROJECTS_PER_GROUP } from "../Redux/Slices/Projects/projectsSlice";

const GroupSelector = ({ onSelectGroup, customStyles, ...props }) => {
  const dispatch = useDispatch();
  const groups = useSelector(selectUserGroups);
  const groupslicestatus = useSelector(
    (state) => state.groups.GROUP_SLICE_STATUS
  );
  const [selectedGroupId, setSelectedGroupId] = useState("");
  const currentGroup = useSelector(
    (state) => state.groups.CURRENT_GROUP_DETAILS
  );
  const [groupError, setGroupError] = useState(false);
  const theme = useTheme();

  const handleGroupChange = (event) => {
    setSelectedGroupId(event.target.value);
    if (setSelectedGroupId) {
      const selectedGroup = groups.find(
        (item) => item.id === event.target.value
      );
      // console.log(selectedGroup);
      dispatch(setCurrentGroup(selectedGroup));
      dispatch(fetchGroupMembers(event.target.value));
      dispatch(FETCH_PROJECTS_PER_GROUP(event.target.value));
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
      {groupslicestatus === "loading" && (
        <CircularProgress size={15} sx={{ marginTop: 2, color: "red" }} />
      )}
      {groupslicestatus === "failed" && (
        <Typography color="error">Failed to load groups</Typography>
      )}
      {groupslicestatus === "completed" && (
        <CustomDropdown
          withAvatar
          disabled={props.formState}
          label="Group"
          labelColor={
            props.darkLabel
              ? theme.palette.secondary.main
              : theme.palette.primary.white
          }
          options={groups}
          value={currentGroup?.id}
          onChange={handleGroupChange}
          error={groupError}
          helperText={groupError ? "Please select a group" : ""}
        />
      )}
    </Box>
  );
};

export default GroupSelector;
