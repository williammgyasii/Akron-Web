import { Box, CircularProgress, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import TaskForm from "../Components/TaskForm";
import TasksList from "../Components/TaskLists";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, selectCurrentUser } from "../Redux/Slices/Users/UsersSlice";
import { fetchUserGroups, selectGroups } from "../Redux/Slices/Groups/groupsSlice";
import GroupSelector from "../Components/GroupSelector";

function LandingPage() {
  const groupId = "exampleGroupId";
  const dispatch = useDispatch();
  const loginErrorMsg = useSelector((state) => state.user.error);
  const currentUser = useSelector(selectCurrentUser);

  const groups = useSelector(selectGroups);
  const groupsStatus = useSelector((state) => state.groups.status);
  const [selectedGroup, setSelectedGroup] = useState(null);
  useEffect(() => {
    console.log(groupsStatus)
    dispatch(loginUser({ email: "william@gmail.com", password: "william123" }));
    dispatch(fetchUserGroups(currentUser.uid));

    return () => {};
  }, []);

  const handleSelectGroup = (groupId) => {
    setSelectedGroup(groupId);
  };

  return (
    <Container>
      <Box>This is going to be the landing page of messyness</Box>
      {groupsStatus === "loading" && <CircularProgress />}
      {groupsStatus === "failed" && (
        <Typography color="error">Failed to load groups</Typography>
      )}
      {groupsStatus === "succeeded" && (
        <>
          <GroupSelector onSelectGroup={handleSelectGroup} />
          {selectedGroup && <TaskForm groupId={selectedGroup} />}
        </>
      )}
    </Container>
  );
}

export default LandingPage;
