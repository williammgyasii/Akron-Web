import React from "react";
import { useSelector } from "react-redux";
import { selectGroupMembers } from "../Redux/Slices/Groups/groupsSlice";

function AssignToMember() {
  const groupMembers = useSelector(selectGroupMembers);
  return <div>AssignToMember{groupMembers.length}</div>;
}

export default AssignToMember;
