import React from "react";
import { Box, Avatar, Typography, styled, useTheme, Chip } from "@mui/material";
import CustomTitles from "./CustomTitles";

const ProfileWrapper = styled(Box)({
  display: "flex",
  alignItems: "center",
  // padding: "10px 10px",
});

const OnlineIndicator = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "40px",
  height: "40px",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: "2px",
    right: "2px",
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    backgroundColor: "green",
    border: `2px solid ${theme.palette.background.paper}`,
  },
}));

const UserInfo = styled(Box)({
  marginLeft: "10px",
  display: "flex",
  flexDirection: "column",
  gap: "4px",
});

const StyledChip = styled(Chip)({
  maxWidth: "fit-content",
  padding: "0px 8px",
  borderRadius:5,
  marginTop:-1
});

const ProfileCard = ({
  imageUrl = "https://i.pravatar.cc/150?img=10",
  name,
  role,
}) => {
  const theme = useTheme();
  return (
    <ProfileWrapper>
      <Avatar
        src={imageUrl}
        alt={`${name} avatar`}
        sx={{ width: 50, height: 50 }}
      />

      <UserInfo>
        <CustomTitles
          customStyles={{ textTransform: "none" }}
          variant="text_sm"
          // fontWeight="bold"
        >
          {name}
        </CustomTitles>
        <StyledChip label={role} color="primary" size="small" />
      </UserInfo>
    </ProfileWrapper>
  );
};

export default ProfileCard;
