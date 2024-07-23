import { Box, Container } from "@mui/material";
import React, { useEffect } from "react";
import TaskForm from "../Components/TaskForm";
import TasksList from "../Components/TaskLists";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, selectCurrentUser } from "../Redux/Slices/Users/UsersSlice";

function LandingPage() {
  const groupId = "exampleGroupId";
  const dispatch = useDispatch();
  const loginErrorMsg = useSelector((state) => state.user.error);
  const currentUser = useSelector(selectCurrentUser);
  useEffect(() => {
    dispatch(loginUser({ email: "william@gmail.com", password: "william123" }));

    return () => {};
  }, []);

  return (
    <Container>
      <Box>This is going to be the landing page of messyness</Box>
      <TaskForm groupId={"3Q1Z8Na1Dqe9J5yZ6G84"} />
      <TasksList groupId={"3Q1Z8Na1Dqe9J5yZ6G84"} />
    </Container>
  );
}

export default LandingPage;
