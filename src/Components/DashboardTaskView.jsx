import { Box, IconButton, useTheme } from "@mui/material";
import React from "react";
import { IoAddSharp } from "react-icons/io5";
import CustomTitles from "./CustomTitles";

function DashboardTaskView({ handleOpenTaskModal }) {
  const theme = useTheme();
  return (
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
  );
}

export default DashboardTaskView;
