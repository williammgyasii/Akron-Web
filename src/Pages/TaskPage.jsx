import { Container } from "@mui/material";
import React from "react";
import AppBarComponent from "../Components/AppBarComponent";

function TaskPage() {
  return (
    <Container disableGutters>
      <AppBarComponent pageHeader showOthers title={"Task"} />
    </Container>
  );
}

export default TaskPage;
