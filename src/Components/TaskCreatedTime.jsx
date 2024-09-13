import React from "react";
import moment from "moment";

const TaskCreatedTime = ({ createdAt }) => {
  return (
    <div>
      <small>Task created {moment(createdAt).fromNow()}</small>
    </div>
  );
};

export default TaskCreatedTime;
