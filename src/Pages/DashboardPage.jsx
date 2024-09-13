import { Box, Container, Grid, IconButton, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomTitles from "../Components/CustomTitles";
import { IoAddSharp } from "react-icons/io5";
import CreateTaskModal from "../Components/CreateTaskModal";
import DashboardTaskView from "../Components/DashboardTaskView";

function DashboardPage() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [openTaskModal, setOpenTaskModal] = useState(false);
  const { PROJECT_TASKS } = useSelector((state) => state.tasks);
  // console.log(currentGroup);

  useEffect(() => {
    console.log(PROJECT_TASKS);
  }, []);

  const handleCloseTaskModal = () => {
    setOpenTaskModal(false);
  };
  const handleOpenTaskModal = () => {
    setOpenTaskModal(true);
  };

  return (
    <Container disableGutters maxWidth={false} sx={{ position: "relative" }}>
      {/* <VerticalStepper /> */}
      <Grid p={1} className="min-h-screens" container columnSpacing={2}>
        <Grid item sx={{ height: "100%" }} desktop={8} tablets_port={10}>
          <Box
            sx={{
              backgroundColor: "red",
              display: "flex",
              width: "100%",
              padding: "10px",
              height: "100%",
              flexDirection: "column",
            }}
          >
            <CustomTitles
              color={theme.palette.secondary.main}
              variant="text_base"
              // capitalize="none"
              weightFont={"medium"}
              customStyles={{
                textTransform: "none",
                display: "block",
                zIndex: 1,
                p: 1,
              }}
            >
              Tasks
            </CustomTitles>
          </Box>
        </Grid>

        <Grid
          sx={{
            position: "relative",
          }}
          item
          desktop={4}
        >
          <DashboardTaskView handleOpenTaskModal={handleOpenTaskModal} />
        </Grid>
      </Grid>

      {/* CREATE TASK MODAL IN DASHBOARD */}
      <CreateTaskModal isOpen={openTaskModal} onClose={handleCloseTaskModal} />
    </Container>
  );
}

export default DashboardPage;
