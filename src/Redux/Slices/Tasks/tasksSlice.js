// src/features/tasks/tasksSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { firebaseFirestore } from "../../../Firebase/getFirebase";
import { hideModal, openSnackbar } from "../System/systemSlice";

// Async thunk for fetching tasks by user in a specific group
export const fetchTasksByUserInGroup = createAsyncThunk(
  "tasks/fetchTasksByUserInGroup",
  async ({ groupId, userId }, { rejectWithValue }) => {
    return new Promise((resolve, reject) => {
      const q = query(
        collection(firebaseFirestore, `groups/${groupId}/tasks`),
        where("assignedTo", "==", userId)
      );

      const unsubscribe = onSnapshot(
        q,
        (querySnapshot) => {
          const tasks = [];
          querySnapshot.forEach((doc) => {
            tasks.push({ id: doc.id, ...doc.data() });
          });
          resolve(tasks);
        },
        (error) => reject(rejectWithValue(error.message))
      );

      // Clean up function
      return () => unsubscribe();
    });
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
    taskLoading: false,
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
    setTaskLoading: (state, action) => {
      state.taskLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasksByUserInGroup.pending, (state) => {
        state.taskLoading = true;
        state.taskError = null;
      })
      .addCase(fetchTasksByUserInGroup.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.taskLoading = false;
      })
      .addCase(fetchTasksByUserInGroup.rejected, (state, action) => {
        state.taskError = action.payload;
        state.taskLoading = false;
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

export const { addTask, setTaskError, clearTaskError, setTaskLoading } =
  tasksSlice.actions;
export const selectTaskState = (state) => state.tasks.status;
export const selectTaskLoading = (state) => state.tasks.taskLoading;
export default tasksSlice.reducer;
