// src/features/tasks/tasksSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    projectTasks: [],
    TASK_SLICE_STATUS: "idle",
    TASK_SLICE_ERROR: "er",
    TASK_SLICE_ISLOADING: false,
    TASK_UNSUBSCRIBE: null,
  },
  reducers: {},
  // extraReducers: (builder) => {
  //   builder;
  // },
});


export default tasksSlice.reducer;
