import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { firebaseFirestore } from "../../../Firebase/getFirebase";
import { fetchProjectsInBatches } from "../../../Firebase/firestoreFunctions";

// Fetch projects based on the selected group ID
export const FETCH_PROJECTS_PER_GROUP = createAsyncThunk(
  'projects/fetchProjectsForGroup',
  async (groupId, { rejectWithValue }) => {
    try {
      console.log(groupId)
      // Fetch group document to get project IDs
      const groupDocRef = doc(firebaseFirestore, 'groups', groupId);
      const groupDocSnap = await getDoc(groupDocRef);

      if (!groupDocSnap.exists()) {
        throw new Error('Group does not exist');
      }

      const groupData = groupDocSnap.data();
      const projectIds = groupData.projects || [];

      // Fetch projects in batches
      const projects = await fetchProjectsInBatches(projectIds);
      return projects;
    } catch (error) {
      console.error('Error fetching projects for group:', error);
      return rejectWithValue(error.message);
    }
  }
);

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
    tasks: [],
    activeProject: null,
    PROJECT_SLICE_ISLOADING: false,
    PROJECT_SLICE_STATUS: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch User Project reducers
      .addCase(FETCH_PROJECTS_PER_GROUP.pending, (state) => {
        state.status = "loading";
      })
      .addCase(FETCH_PROJECTS_PER_GROUP.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.projects = action.payload;
      })
      .addCase(FETCH_PROJECTS_PER_GROUP.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
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
