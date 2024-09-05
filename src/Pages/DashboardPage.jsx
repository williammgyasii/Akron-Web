import { Box, Button, Container, IconButton, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentUser,
} from "../Redux/Slices/Users/UsersSlice";
import GroupTaskList from "../Components/GroupTaskList";
import {
  FETCH_USER_GROUPS,
  selectGroupID,
  selectGroupMembers,
  selectGroupProjects,
} from "../Redux/Slices/Groups/groupsSlice";
import CustomTitles from "../Components/CustomTitles";
import { IoAddSharp } from "react-icons/io5";
import {
  showModal,
} from "../Redux/Slices/System/systemSlice";

function DashboardPage() {
  const dispatch = useDispatch();
  const groupMembers = useSelector(selectGroupMembers);
  const theme = useTheme();
  const selectedGroupid = useSelector(selectGroupID);
  const currentUser = useSelector(selectCurrentUser);
  const projects = useSelector(selectGroupProjects);

  // console.log(currentUser);

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
      <Box
        sx={{
          p: 1.5,
          display: "flex",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            backgroundColor: theme.palette.background.paper,
            borderRadius: 2,
            alignItems: "center",
            justifyContent: "center",
          }}
          flexGrow={1}
        >
          Current Group Member :{groupMembers.length}
          <br />
          current Group Project :{projects.length}
        </Box>
        <Box
          sx={{
            px: 1,
            overflowY: "auto",
            position: "relative",
            width: 300,
            marginLeft: "10px",
            backgroundColor: theme.palette.background.paper,
            borderRadius: 2,
            [theme.breakpoints.down("tablets_port")]: {
              display: "none",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              flex: 1,
            }}
          >
            <GroupTaskList groupId={selectedGroupid} />
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default DashboardPage;
