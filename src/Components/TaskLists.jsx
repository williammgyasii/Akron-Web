// TaskList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasksByUserInGroup } from './tasksSlice'; // Adjust the path as needed
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

const TaskList = ({ groupId, userId }) => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);

  useEffect(() => {
    const unsubscribe = dispatch(fetchTasksByUserInGroup({ groupId, userId }));

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, [dispatch, groupId, userId]);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Due Date: {new Date(task.dueDate.seconds * 1000).toLocaleDateString()}</p>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
