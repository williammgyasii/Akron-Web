import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  startAfter,
  Timestamp,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { firebaseFirestore } from "../../../Firebase/getFirebase";
import { fetchProjectsInBatches } from "../../../Firebase/firestoreFunctions";

// Async thunk for fetching projects in a specific group
export const FETCH_PROJECTS_PER_GROUP = createAsyncThunk(
  "projects/fetchProjectsByGroup",
  async (groupId, { rejectWithValue }) => {
    try {
      // Create a query against the "projects" collection
      const q = query(
        collection(firebaseFirestore, "projects"),
        where("groupId", "==", groupId)
      );

      // Fetch the projects
      const querySnapshot = await getDocs(q);
      const projects = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));


      return projects; // Return the fetched projects
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to create a new project
export const CREATE_PROJECT = createAsyncThunk(
  "projects/createProject",
  async ({ projectName, groupId, userId, members }, { rejectWithValue }) => {
    try {
      // Create a new document in the 'projects' collection
      const projectRef = await addDoc(
        collection(firebaseFirestore, "projects"),
        {
          projectName,
          groupId,
          createdBy: userId,
          createdAt: Timestamp.now(),
          members: members,
        }
      );
      // Optionally, update group with new project
      const groupRef = doc(firebaseFirestore, "groups", groupId);
      await updateDoc(groupRef, {
        projects: arrayUnion(projectRef.id),
      });

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
    PROJECTS: [],
    tasks: [],
    ACTIVE_PROJECT: null,
    PROJECT_SLICE_ISLOADING: false,
    PROJECT_SLICE_STATUS: "idle",
    PROJECT_SLICE_ERROR: null,
  },
  reducers: {
    setActiveProject: (state, action) => {
      state.ACTIVE_PROJECT = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch User Project reducers
      .addCase(FETCH_PROJECTS_PER_GROUP.pending, (state) => {
        state.PROJECT_SLICE_STATUS = "loading";
        state.PROJECT_SLICE_ISLOADING = true;
      })
      .addCase(FETCH_PROJECTS_PER_GROUP.fulfilled, (state, action) => {
        state.PROJECT_SLICE_STATUS = "completed";
        state.PROJECTS = action.payload;
        state.PROJECT_SLICE_ISLOADING = false;
      })
      .addCase(FETCH_PROJECTS_PER_GROUP.rejected, (state, action) => {
        state.PROJECT_SLICE_STATUS = "failed";
        state.PROJECT_SLICE_ERROR = action.payload;
        state.PROJECT_SLICE_ISLOADING = false;
      })
      // Project creation reducers
      .addCase(CREATE_PROJECT.pending, (state) => {
        state.PROJECT_SLICE_STATUS = "loading";
        state.PROJECT_SLICE_ISLOADING = true;
      })
      .addCase(CREATE_PROJECT.fulfilled, (state, action) => {
        state.PROJECT_SLICE_STATUS = "completed";
        state.PROJECTS.push(action.payload);
        state.PROJECT_SLICE_ISLOADING = false;
      })
      .addCase(CREATE_PROJECT.rejected, (state, action) => {
        state.PROJECT_SLICE_STATUS = "failed";
        state.error = action.payload;
        state.PROJECT_SLICE_ISLOADING = false;
      });
  },
});

export const { setActiveProject } = projectsSlice.actions;
export const selectActiveProject = (state) => state.projects.ACTIVE_PROJECT;
export default projectsSlice.reducer;
