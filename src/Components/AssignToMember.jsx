import React from "react";
import { useSelector } from "react-redux";
import {
  selectGroupMembers,
  selectGroupStatus,
} from "../Redux/Slices/Groups/groupsSlice";
import CustomDropdown from "./CustomDropdown";

function AssignToMember({ onChange, value, error, customStyles }) {
  const groupMembers = useSelector(selectGroupMembers);
  const status = useSelector(selectGroupStatus);
  // console.log(groupMembers);

  return (
    <CustomDropdown
      withAvatar
      pickerWidth="small"
      label={"Assign To "}
      options={groupMembers}
      value={value}
      onChange={onChange}
      loading={status === "loading"}
      error={error}
      customStyles={customStyles}
    />
  );
}

export default AssignToMember;
