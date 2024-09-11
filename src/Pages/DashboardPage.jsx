import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomTitles from "../Components/CustomTitles";
import { IoAddSharp } from "react-icons/io5";
import { showModal } from "../Redux/Slices/System/systemSlice";
import { motion } from "framer-motion";
import CreateTaskModal from "../Components/CreateTaskModal";
import CreateGroupModal from "../Components/CreateGroupModal";
import VerticalStepper from "../AnimatedComponents/VerticalStepperModal";
import HorizontalLinearStepper from "../AnimatedComponents/VerticalStepperModal";
import { DatePicker } from "antd";

function DashboardPage() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [openTaskModal, setOpenTaskModal] = useState(false);
  // console.log(currentGroup);

  useEffect(() => {
    // dispatch(openSnackbar({message:"Group Created",snackbarState:"info"}))
    // dispatch(FETCH_USER_GROUPS());
    // dispatch(
    //   fetchProjectsByGroupId({
    //     groupId: selectedGroupid,
    //     userId: currentUser.uid,
    //   })
    // )
    //   .unwrap()
    //   .then((result) => {
    //   });
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
        <Grid item sx={{ height: "100%" }} desktop={9} tablets_port={10}>
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
          desktop={3}
        >
          <Box
            sx={{
              minHeight: "100vh",
              backgroundColor: "red",
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                backgroundColor: "yellow",
                justifyContent: "space-between",
                alignItems: "center",
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
              <IconButton
                onClick={handleOpenTaskModal}
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  color: "white",
                  borderRadius: 1,
                  "&:hover": {
                    backgroundColor: theme.palette.primary.dark800, // Slightly lighter black on hover
                  },
                }}
              >
                <IoAddSharp size={10} />
              </IconButton>
            </Box>
            <Box sx={{ backgroundColor: "blue" }}>
              ac
              {/* <GroupTaskList groupId={selectedGroupid} /> */}
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* CREATE TASK MODAL IN DASHBOARD */}
      <CreateTaskModal isOpen={openTaskModal} onClose={handleCloseTaskModal} />
    </Container>
  );
}

export default DashboardPage;
