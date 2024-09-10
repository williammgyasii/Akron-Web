import {
  Autocomplete,
  Avatar,
  Chip,
  Popper,
  styled,
  TextField,
} from "@mui/material";
import { IoTrash } from "react-icons/io5";
import { useSelector } from "react-redux";

const StyledPopper = styled(Popper)(({ theme }) => ({
  maxHeight: "150px",
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
  const { GROUP_SLICE_ISLOADING } = useSelector((state) => state.groups);
  return (
    <Autocomplete
      id="member-selector"
      size="small"
      options={members}
      getOptionLabel={(option) => option.email} // Search by email
      value={members.filter((m) => selectedMembers.includes(m.id))} // Display selected members
      onChange={(event, newValue) => handleChange(newValue)} // Pass the external handleChange function
      multiple
      limitTags={2}
      loading={GROUP_SLICE_ISLOADING}
      filterSelectedOptions={true}
      isOptionEqualToValue={(option, value) => option.id === value.id} // Ensure uniqueness based on ID
      PopperComponent={StyledPopper} // Use custom Popper for dropdown styling
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
              deleteIcon={<IoTrash />}
              onDelete={() => handleDelete(option.id)} // Pass the delete handler from props
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
          placeholder="Search by email"
        />
      )}
    />
  );
};

export default MemberSelector;
