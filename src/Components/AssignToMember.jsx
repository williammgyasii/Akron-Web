import React from "react";
import { useSelector } from "react-redux";
import {
  selectGroupMembers,
  selectGroupStatus,
} from "../Redux/Slices/Groups/groupsSlice";
import MemberDropdown from "./MemberDropdown";
import CustomDropdown from "./CustomDropdown";

function AssignToMember({ onChange, value, error }) {
  const groupMembers = useSelector(selectGroupMembers);
  const status = useSelector(selectGroupStatus);

  return (
    <CustomDropdown
      label={"Assign To "}
      options={groupMembers}
      value={value}
      onChange={onChange}
      loading={status === "loading"}
      error={error}
    />
  );
}

export default AssignToMember;
