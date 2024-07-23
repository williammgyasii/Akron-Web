import { Box, Container } from "@mui/material";
import React from "react";
import TaskForm from "../Components/TaskForm";
import TasksList from "../Components/TaskLists";

function LandingPage() {
  const groupId = "exampleGroupId";
  return (
    <Container>
      <Box>This is going to be the landing page of messyness</Box>
      <TaskForm groupId={groupId} />
      <TasksList groupId={groupId} />
    </Container>
  );
}

export default LandingPage;
