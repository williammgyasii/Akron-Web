import { Box, Grid, Modal, styled } from "@mui/material";
import React from "react";
import CustomButton from "./CustomButton";

function CreateProjectModal({ openModal, onCloseModal }) {
  return (
    <StyledModal
      BackdropProps={{
        style: { backgroundColor: "rgba(0, 0, 0, 0.80)" },
        onClick: (e) => e.stopPropagation(),
      }}
      open={openModal}
      onClose={onCloseModal}
    >
      <StyledGridContainer columns={12} container columnSpacing={2}>
        <Grid item desktop={12}>
          Image
        </Grid>
        <Grid item desktop={12}>
          Content
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
            // disabled={GROUP_SLICE_ISLOADING}
            
            submit
            size="medium"
            sx={{ color: "#fff",width:"200px" }}
            variant="minimal"
          >
            Copy Project Invite
          </CustomButton>

          <ButtonContainer>
            <CustomButton
            //   onClick={handleClose}
              // // type="iconOnly"
              // loadingButton={groupUploading}
              // leftIcon={MdFormatListBulletedAdd}
            //   disabled={GROUP_SLICE_ISLOADING}
              submit
              size="medium"
              sx={{ color: "#fff" }}
              variant="secondary"
            >
              Cancel
            </CustomButton>
            <CustomButton
            //   onClick={handleSubmit}
              // disabled={buttonNext}
            //   leftIcon={MdFormatListBulletedAdd}
            //   isLoading={GROUP_SLICE_ISLOADING}
              submit
              size="medium"
              sx={{ color: "#fff" }}
              type="iconLeft"
              variant="primary"
              color="primary"
            >
              Create Group
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
  width: 800,
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
  width: "30%",
  marginLeft: "auto",
  gap: "10px",
}));
