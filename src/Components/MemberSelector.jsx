import {
  Autocomplete,
  Avatar,
  Chip,
  Popper,
  styled,
  TextField,
} from "@mui/material";
import { useState } from "react";
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
      multiple
      options={members}
      getOptionLabel={(option) => option.email}
      value={selectedMembers}
      
      limitTags={2}
      noOptionsText="No Members Available"
      onChange={handleChange}
      filterSelectedOptions
      renderTags={(value, getTagProps) =>
        value.map((option, index) => {
          const { key, ...tagProps } = getTagProps({ index });
          return (
            <Chip
              key={key}
              label={option.firstName}
              avatar={
                <Avatar
                  src={
                    `https://www.tapback.co/api/avatar.webp` || option?.imageUrl
                  }
                />
              }
              onDelete={() => handleDelete(option.id)}
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
          placeholder="Search members"
          size="small"
        />
      )}
      PopperComponent={StyledPopper}
    />
  );
};

export default MemberSelector;
