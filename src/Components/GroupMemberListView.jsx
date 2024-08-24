import {
  Avatar,
  Box,
  Chip,
  ListItem,
  ListItemAvatar,
  ListItemText,
  styled,
  Typography,
} from "@mui/material";

const MemberName = styled(Typography)({
//   fontWeight: "bold",
  color: "#333",
});

const MemberEmail = styled(Typography)({
  color: "#777",
  fontSize: "0.8rem",
});

const GroupMemberListView = ({ member, index }) => {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>{member.name.charAt(0).toUpperCase()}</Avatar>
      </ListItemAvatar>
      <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <MemberName>{member.name}</MemberName>
        <MemberEmail>{member.email}</MemberEmail>
      </Box>
      <Chip sx={{fontSize:"12px"}}
        label={index === 0 ? "ADMIN" : member.status}
        color={index === 0 ? "primary" : "default"}
      />
    </ListItem>
  );
};

export default GroupMemberListView;
