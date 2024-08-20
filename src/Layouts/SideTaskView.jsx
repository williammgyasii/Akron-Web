import { IoAddSharp } from "react-icons/io5";
import GroupTaskList from "../Components/GroupTaskList";
import { Box, IconButton, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CustomTitles from "../Components/CustomTitles";
import { showModal } from "../Redux/Slices/System/systemSlice";
import { selectGroupID } from "../Redux/Slices/Groups/groupsSlice";

const SideTaskView = ({}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const selectedGroup = useSelector(selectGroupID);

  return (
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
          onClick={() => dispatch(showModal())}
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
        <GroupTaskList groupId={selectedGroup} />
      </Box>
    </Box>
  );
};

export default SideTaskView;
