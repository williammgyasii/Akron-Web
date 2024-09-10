import { Box, Chip, Grid, Modal, styled, useTheme } from "@mui/material";
import React, { useState } from "react";
import CustomButton from "./CustomButton";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { IoLink } from "react-icons/io5";
import projectImage from "../Images/RegisterBg.jpg";
import { motion } from "framer-motion";
import CustomTitles from "./CustomTitles";
import CustomFormInput from "./CustomFormInput";
import { useDispatch, useSelector } from "react-redux";
import { CREATE_PROJECT } from "../Redux/Slices/Projects/projectsSlice";
import { selectCurrentUser } from "../Redux/Slices/Users/UsersSlice";
import { openSnackbar } from "../Redux/Slices/System/systemSlice";
import MemberSelector from "./MemberSelector";

function CreateProjectModal({ openModal, onCloseModal }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [projectName, setProjectName] = useState("");
  const [projectDesc, setProjectDesc] = useState("");
  const [selectedMemberIds, setSelectedMemberIds] = useState([]);
  const [errors, setErrors] = useState({
    projectNameError: "",
    projectDesc: "",
    emailError: "",
  });
  const currentGroup = useSelector(
    (state) => state.groups.CURRENT_GROUP_DETAILS
  );
  const activegroupmembers = useSelector((state) => state.groups.groupMembers);

  const currentUser = useSelector(selectCurrentUser);
  const { PROJECT_SLICE_ISLOADING, PROJECT_SLICE_STATUS } = useSelector(
    (state) => state.projects
  );

  const handleSubmit = () => {
    dispatch(
      CREATE_PROJECT({
        projectName: projectName,
        groupId: currentGroup.id,
        userId: currentUser?.uid,
        members: selectedMemberIds,
      })
    )
      .unwrap()
      .then(() => {
        dispatch(
          openSnackbar({ message: "Project Created", snackbarState: "info" })
        );
        setProjectName("");
        setProjectDesc("");
        setErrors({ groupNameError: "", groupIconError: "" });
        // dispatch(FETCH_USER_GROUPS(currentUser.uid));
        onCloseModal(); // Close the modal after finishing
      });
  };

  const handleChange = (event, newValue) => {
    setSelectedMemberIds(newValue);
  };

  const handleDelete = (memberId) => {
    setSelectedMemberIds((prev) =>
      prev.filter((member) => member.id !== memberId)
    );
  };

  return (
    <StyledModal
      BackdropProps={{
        style: { backgroundColor: "rgba(0, 0, 0, 0.80)" },
        onClick: (e) => e.stopPropagation(),
      }}
      open={openModal}
      onClose={onCloseModal}
    >
      <StyledGridContainer columns={12} container>
        <Grid item desktop={5}>
          <Box sx={{ height: "300px" }}>
            <img
              style={{ borderRadius: "10px" }}
              src={projectImage}
              className="w-full h-full object-cover"
            />
          </Box>
        </Grid>
        <Grid sx={{ padding: "20px" }} item desktop={7}>
          <motion.div>
            <CustomTitles
              weightFont={"bold"}
              align="left"
              color={theme.palette.secondary.main}
              variant="text_xl"
              withLine
              //   subtitle={"Creating a project to get started"}
            >
              Create A Project
            </CustomTitles>
            <span className="text-sm">
              Project will be created in{" "}
              <Chip
                sx={{
                  backgroundColor: theme.palette.secondary.light400,
                  color: "#fff",
                  fontSize: "10px",
                }}
                label={`${currentGroup?.groupData} Group`}
              />
            </span>
            <FormContainer>
              <CustomFormInput
                label="Project Name or Alias"
                value={projectName}
                type={"text"}
                onChange={(e) => setProjectName(e.target.value)}
                fullWidth
                required
                maxCount={20}
                helperText={errors.projectNameError}
                error={Boolean(errors.projectNameError)}
              />

              <MemberSelector
                members={activegroupmembers}
                selectedMembers={selectedMemberIds} // Pass selected ids
                handleChange={handleChange} // Pass external handleChange
                handleDelete={handleDelete} // Pass external handleDelete
              />
              <CustomFormInput
                minRows={3} // Minimum number of rows (sets height)
                maxRows={9}
                label="Project Description"
                value={projectDesc}
                type={"text"}
                onChange={(e) => setProjectDesc(e.target.value)}
                fullWidth
                multiline
                required
                helperText={errors.projectDesc}
                error={Boolean(errors.projectDesc)}
              />
            </FormContainer>
          </motion.div>
        </Grid>
        <Grid
          sx={{
            padding: 1,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
          item
          desktop={12}
        >
          <CustomButton
            // onClick={handleClose}
            // // type="iconOnly"
            // loadingButton={groupUploading}
            // leftIcon={MdFormatListBulletedAdd}
            disabled={PROJECT_SLICE_ISLOADING}
            size="small"
            sx={{
              color: theme.palette.secondary.main,
              width: "150px",
              border: "1px solid #000",
            }}
            variant="minimal"
          >
            Copy Invite Link
            <IoLink style={{ marginLeft: "2px" }} />
          </CustomButton>

          <ButtonContainer>
            <CustomButton
              onClick={onCloseModal}
              // // type="iconOnly"
              // loadingButton={groupUploading}
              // leftIcon={MdFormatListBulletedAdd}
              disabled={PROJECT_SLICE_ISLOADING}
              submit
              size="medium"
              sx={{ color: "#fff" }}
              variant="secondary"
            >
              Cancel
            </CustomButton>
            <CustomButton
              onClick={handleSubmit}
              leftIcon={MdFormatListBulletedAdd}
              isLoading={PROJECT_SLICE_ISLOADING}
              submit
              size="medium"
              sx={{ color: "#fff" }}
              type="iconLeft"
              variant="primary"
              color="primary"
            >
              Create Project
            </CustomButton>
          </ButtonContainer>
        </Grid>
      </StyledGridContainer>
    </StyledModal>
  );
}

export default CreateProjectModal;

const StyledModal = styled(Modal)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledGridContainer = styled(Grid)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  // boxShadow: theme.shadows[5],
  border: "0",
  outline: "none",
  "&:focus": {
    outline: "none", // Remove the focus outline if it appears
  },
}));

const ModalBox = styled(Box)(({ theme }) => ({
  width: 500,
  backgroundColor: theme.palette.background.paper,
  boxShadow: 24,
  padding: theme.spacing(3),
  borderRadius: 4,
  outline: "none",
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  marginTop: theme.spacing(1),
  width: "50%",
  marginLeft: "auto",
  gap: "10px",
}));

const FormContainer = styled("form")({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: "10px",
  marginTop: "10px",
});
