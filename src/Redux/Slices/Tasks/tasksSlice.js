// src/features/tasks/tasksSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { firebaseFirestore } from "../../../Firebase/getFirebase";

export const fetchTasksInProject = createAsyncThunk(
  "tasks/fetchTasks",
  async ({ projectId }, { rejectWithValue }) => {
    try {
      // Create a reference to the tasks subcollection under the specific project
      const taskRef = collection(
        firebaseFirestore,
        "projects",
        projectId,
        "tasks"
      );

      // Create a Firestore query
      const q = query(taskRef);

      // Fetch the tasks
      const snapshot = await getDocs(q);
      const tasks = [];
      snapshot.forEach((doc) => {
        tasks.push({ ...doc.data(), id: doc.id });
      });

      return tasks; // Return the fetched tasks
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
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
  reducers: {
    clearTasks: (state) => {
      state.PROJECT_TASKS = [];
    },
  },
  extraReducers: (builder) => {
    builder
      //Fetch Task in Group
      .addCase(fetchTasksInProject.pending, (state) => {
        state.TASK_SLICE_ISLOADING = true;
      })
      .addCase(fetchTasksInProject.fulfilled, (state, action) => {
        state.TASK_SLICE_ISLOADING = false;
        state.PROJECT_TASKS = action.payload;
      })
      .addCase(fetchTasksInProject.rejected, (state, action) => {
        state.TASK_SLICE_ISLOADING = false;
        state.TASK_SLICE_ERROR = action.payload;
      })
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
