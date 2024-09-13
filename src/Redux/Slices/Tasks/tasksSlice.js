// src/features/tasks/tasksSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { firebaseFirestore } from "../../../Firebase/getFirebase";
import debounce from lod

// Debounce updates to limit how often the state is updated
const debouncedSetTasks = debounce((dispatch, tasks) => {
  dispatch(setTasks(tasks));
}, 300); // Adjust debounce time as needed

// Async thunk to add a new task
export const createTask = createAsyncThunk(
  "tasks/createTask",
  async ({ projectId, taskData }, { rejectWithValue }) => {
    try {
      console.log(projectId, taskData);

      const taskRef = collection(
        firebaseFirestore,
        "projects",
        projectId,
        "tasks"
      );
      const newTask = {
        ...taskData,
        dueDate: taskData.dueDate, // Pass the due date from the taskData
        timestamp: serverTimestamp(), // Add server timestamp for task creation
      };
      const docRef = await addDoc(taskRef, newTask);
      return { ...newTask, id: docRef.id }; // Return task data along with the generated document ID
    } catch (error) {
      console.log("error/createTask", error);
      return rejectWithValue(error.message);
    }
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    PROJECT_TASKS: [],
    TASK_SLICE_STATUS: "idle",
    TASK_SLICE_ERROR: null,
    TASK_SLICE_ISLOADING: false,
    TASK_UNSUBSCRIBE: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTask.pending, (state) => {
        state.TASK_SLICE_ISLOADING = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.TASK_SLICE_ISLOADING = false;
        state.PROJECT_TASKS.push(action.payload); // Add new task to the tasks array
      })
      .addCase(createTask.rejected, (state, action) => {
        state.TASK_SLICE_ISLOADING = false;
        state.TASK_SLICE_ERROR = action.payload;
      });
  },
});

export default tasksSlice.reducer;
