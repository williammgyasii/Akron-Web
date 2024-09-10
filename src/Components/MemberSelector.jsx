import {
  Autocomplete,
  Avatar,
  Chip,
  Popper,
  styled,
  TextField,
} from "@mui/material";

const StyledPopper = styled(Popper)(({ theme }) => ({
  maxHeight: "200px",
  overflowY: "auto",
  width: "calc(100% - 16px)", // Adjust width to match input field width
  marginTop: theme.spacing(1),
}));

const MemberSelector = ({
  members,
  selectedMembers,
  handleChange,
  handleDelete,
}) => {
  return (
    <Autocomplete
      size="small"
      options={members}
      getOptionLabel={(option) => option.email} // Search by email
      value={selectedMembers.map((id) => members.find((m) => m.id === id))} // Convert selected IDs back to full member object for display
      onChange={handleChange} // Pass the external handleChange function
      multiple
      isOptionEqualToValue={(option, value) => option.email === value.email} // Ensure uniqueness based on email
      renderTags={(value, getTagProps) =>
        value.map((option, index) => {
          const { key, ...tagProps } = getTagProps({ index });
          return (
            <Chip
              key={key}
              variant="outlined"
              label={option.firstName}
              avatar={<Avatar src={`https://www.tapback.co/api/avatar.webp`} />} // Show avatar with first letter of name
              size="small"
              onDelete={() => handleDelete(option)} // Pass the delete handler from props
              {...tagProps}
            />
          );
        })
      }
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label="Select Members"
          placeholder="Add members by email"
        />
      )}
      PopperComponent={StyledPopper}
    />
  );
};

export default MemberSelector;
