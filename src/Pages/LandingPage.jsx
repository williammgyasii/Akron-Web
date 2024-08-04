import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import TaskForm from "../Components/TaskForm";
import TasksList from "../Components/TaskLists";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  logoutUser,
  selectCurrentUser,
} from "../Redux/Slices/Users/UsersSlice";
import {
  fetchUserGroups,
  selectGroups,
  setPrefferedGroup,
} from "../Redux/Slices/Groups/groupsSlice";
import GroupSelector from "../Components/GroupSelector";
import { fetchTasks } from "../Redux/Slices/Tasks/tasksSlice";
import { persistor, resetState } from "../Redux/store";
import { useNavigate, useNavigation } from "react-router-dom";

function LandingPage() {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const groupsStatus = useSelector((state) => state.groups.status);
  const loginStatus = useSelector((state) => state.user.status);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const navigate = useNavigate();

  const handleSelectGroup = (groupId) => {
    setSelectedGroup(groupId);
    dispatch(setPrefferedGroup(groupId));
    if (selectedGroup) {
      dispatch(fetchTasks(groupId));
    }
  };

  return (
    <Container component={"main"} sx={{ backgroundColor: "red" }}>
      <Box>This is going to be the landing page of messyness</Box>
{/* 
      {groupsStatus === "loading" && <CircularProgress />}
      {groupsStatus === "failed" && (
        <Typography color="error">Failed to load groups</Typography>
      )}
      {groupsStatus === "succeeded" && (
        <>
          <GroupSelector onSelectGroup={handleSelectGroup} />
          {selectedGroup && <TaskForm groupId={selectedGroup} />}
          <TasksList />
        </>
      )} */}
    </Container>
  );
}

export default LandingPage;
