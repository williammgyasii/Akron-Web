// src/components/GroupSelector.js
import React from "react";
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
import { selectGroups } from "../Redux/Slices/Groups/groupsSlice";

const GroupSelector = ({ onSelectGroup }) => {
  const dispatch = useDispatch();
  const groups = useSelector(selectGroups);
  const groupsStatus = useSelector((state) => state.groups.status);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Select Group
      </Typography>
      {groupsStatus === "loading" && <CircularProgress />}
      {groupsStatus === "failed" && (
        <Typography color="error">Failed to load groups</Typography>
      )}
      {groupsStatus === "succeeded" && (
        <FormControl fullWidth>
          <InputLabel id="group-select-label">Group</InputLabel>
          <Select
            labelId="group-select-label"
            id="group-select"
            onChange={(e) => onSelectGroup(e.target.value)}
            defaultValue=""
          >
            {groups.map((group) => (
              <MenuItem key={group.id} value={group.id}>
                {group.groupName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </Container>
  );
};

export default GroupSelector;
