// TaskList.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// Adjust the path as needed
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { selectCurrentUser } from "../Redux/Slices/Users/UsersSlice";
import {
  clearUnsubscribe,
  fetchTasksByUserInGroup,
} from "../Redux/Slices/Tasks/tasksSlice";
import { Typography } from "@mui/material";

const GroupTaskList = ({ groupId, userId }) => {
  const dispatch = useDispatch();
  const { tasks, taskLoading, taskError } = useSelector((state) => state.tasks);
  const currentUser = useSelector(selectCurrentUser);
  // console.log(tasks)


  useEffect(() => {
    // dispatch(fetchTasksByUserInGroup({ groupId, userId: currentUser.userId }));

    // Clean up subscription on unmount
    return () => {
      dispatch(clearUnsubscribe());
    };
  }, [dispatch, groupId]);

  if (taskLoading) return <CircularProgress />;
  if (taskError) return <Alert severity="error">{taskError}</Alert>;
  if (tasks.length <= 0) return <Typography>No Task In Group</Typography>;

  const sortedTasks = [...tasks].sort(
    (a, b) => b.startDate - a.startDate
  );

  return (
    <ul style={{ width: "100%",marginTop:"-2px" }}>
      {sortedTasks.map((task) => (
        <li key={task.id}>
          <h3>{task.taskTitle}</h3>
          <p>{task.taskDescription}</p>
          <p>
            Due Date:{" "}
            {new Date(task.startDate?.seconds * 1000).toLocaleDateString()}
          </p>
        </li>
      ))}
    </ul>
  );
};

export default GroupTaskList;
