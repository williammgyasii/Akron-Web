import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { firebaseFirestore } from "../../../Firebase/getFirebase";

// Async thunk to create a new project
export const CREATE_PROJECT = createAsyncThunk(
  "projects/createProject",
  async ({ projectName, groupId, userId }, { rejectWithValue }) => {
    try {
      // Create a new document in the 'projects' collection
      const projectRef = await addDoc(
        collection(firebaseFirestore, "projects"),
        {
          projectName,
          groupId,
          createdBy: userId,
          createdAt: Timestamp.now(),
        }
      );

      return {
        projectId: projectRef.id,
        projectName,
        groupId,
        createdBy: userId,
        createdAt: Timestamp.now(),
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const projectsSlice = createSlice({
  name: "Projects",
  initialState: {
    projects: [],
    tasks:[],
    activeProject: null,
    PROJECT_SLICE_ISLOADING: false,
    PROJECT_SLICE_STATUS: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Project creation reducers
      .addCase(CREATE_PROJECT.pending, (state) => {
        state.PROJECT_SLICE_STATUS = "loading";
        state.PROJECT_SLICE_ISLOADING = true;
      })
      .addCase(CREATE_PROJECT.fulfilled, (state, action) => {
        state.PROJECT_SLICE_STATUS = "completed";
        state.projects.push(action.payload);
        state.PROJECT_SLICE_ISLOADING = false;
      })
      .addCase(CREATE_PROJECT.rejected, (state, action) => {
        state.PROJECT_SLICE_STATUS = "failed";
        state.error = action.payload;
        state.PROJECT_SLICE_ISLOADING = false;
      });
  },
});

export default projectsSlice.reducer;
