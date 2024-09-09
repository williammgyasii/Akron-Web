import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  useTheme,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../Redux/Slices/Users/UsersSlice";
import {
  FETCH_USER_GROUPS,
  selectGroupID,
  selectGroupMembers,
  selectGroupProjects,
} from "../Redux/Slices/Groups/groupsSlice";
import CustomTitles from "../Components/CustomTitles";
import { IoAddSharp } from "react-icons/io5";
import { showModal } from "../Redux/Slices/System/systemSlice";
import { motion } from "framer-motion";
import CreateGroupForm from "../Components/CreateGroupForm";
import CustomFormInput from "../Components/CustomFormInput";

function DashboardPage() {
  const dispatch = useDispatch();
  const theme = useTheme();
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

  return (
    <Container disableGutters maxWidth={false} sx={{ position: "relative" }}>
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
                onClick={() => dispatch(showModal("createTask"))}
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
            <Box sx={{ backgroundColor: "blue"}}>
              ac
              {/* <GroupTaskList groupId={selectedGroupid} /> */}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default DashboardPage;
