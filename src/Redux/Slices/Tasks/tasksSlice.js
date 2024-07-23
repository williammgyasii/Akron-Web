// src/features/tasks/tasksSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { firebaseFirestore } from '../../../Firebase/getFirebase';

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (groupId) => {
  const querySnapshot = await getDocs(collection(firebaseFirestore, 'groups', groupId, 'tasks'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
});

export const addTask = createAsyncThunk('tasks/addTask', async ({ groupId, taskData }) => {
  const docRef = await addDoc(collection(firebaseFirestore, 'groups', groupId, 'tasks'), taskData);
  return { id: docRef.id, ...taskData };
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      });
  },
});

export default tasksSlice.reducer;
