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
  setPrefferedGroup,
  setSelectedGroupID,
} from "../Redux/Slices/Groups/groupsSlice";
import CustomDropdown from "./CustomDropdown";
import { selectCurrentUser } from "../Redux/Slices/Users/UsersSlice";

const GroupSelector = ({ onSelectGroup, customStyles, ...props }) => {
  const dispatch = useDispatch();
  const groups = useSelector(selectUserGroups);
  const groupslicestatus = useSelector(
    (state) => state.groups.GROUP_SLICE_STATUS
  );
  const selectedGroup = useSelector(selectGroupID);
  const [groupError, setGroupError] = useState(false);
  const theme = useTheme();
  const currentUser = useSelector(selectCurrentUser);



  console.log(groups, groupslicestatus);

  const handleGroupChange = (event) => {
    dispatch(setSelectedGroupID(event.target.value));
    dispatch(fetchGroupMembers(event.target.value));
    dispatch(
      fetchProjectsByGroupId({
        groupId: event.target.value,
        userId: currentUser.uid,
      })
    );
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
      {groupslicestatus === "loading" && (
        <CircularProgress size={15} sx={{ marginTop: 2, color: "red" }} />
      )}
      {groupslicestatus === "failed" && (
        <Typography color="error">Failed to load groups</Typography>
      )}
      {groupslicestatus === "completed" && (
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
