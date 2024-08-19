// src/features/tasks/tasksSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { firebaseFirestore } from "../../../Firebase/getFirebase";
import { hideModal, openSnackbar } from "../System/systemSlice";

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (groupId) => {
    const querySnapshot = await getDocs(
      collection(firebaseFirestore, "groups", groupId, "tasks")
    );
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }
);

export const addTaskToGroup = createAsyncThunk(
  "tasks/addTaskToGroup",
  async ({ selectedGroup, taskData }, { rejectWithValue, dispatch }) => {
    try {
      console.log("tasks/addTaskToGroup", taskData);
      const tasksRef = collection(
        firebaseFirestore,
        "groups",
        selectedGroup,
        "tasks"
      );
      const docRef = await addDoc(tasksRef, taskData); // Auto-generate ID
      //CLOSEMODAL
      dispatch(hideModal());
      dispatch(
        openSnackbar({
          message: "Task Added",
          severity: "success",
        })
      );
      return { id: docRef.id, ...taskData }; // Include the generated ID in the payload
    } catch (error) {
      console.log("tasks/addTaskToGroup", error);
      return rejectWithValue(error.message);
    }
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    status: "idle",
    taskError: "er",
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      state.taskError = null;
    },
    setTaskError: (state, action) => {
      state.taskError = action.payload;
    },
    clearTaskError: (state) => {
      state.taskError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(addTaskToGroup.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addTaskToGroup.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks.push(action.payload);
      })
      .addCase(addTaskToGroup.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { addTask, setTaskError, clearTaskError } = tasksSlice.actions;
export const selectTaskState = (state) => state.tasks.status;
export default tasksSlice.reducer;
