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

// Thunk to fetch user's projects based on their group membership
export const FETCH_USER_PROJECTS = createAsyncThunk(
  "projects/fetchUserProjects",
  async (userId, { rejectWithValue,dispatch, }) => {
    try {
    
      // Fetch user document to get project IDs
      const userDocRef = doc(firebaseFirestore, "users", userId);
      const userDocSnap = await getDoc(userDocRef);
      console.log("projects/fetchUserProjects",userDocSnap);
      // if (!userDocSnap.exists()) {
      //   throw new Error("User does not exist");
      // }

      // console.log(userDocSnap);

      // const userData = userDocSnap.data();
      // const groupIds = userData.groups?.map(group => group.groupId) || [];
      // console.log(groupIds)

      // if (groupIds.length === 0) {
      //   return []; // If no groups, return an empty array
      // }

      // const projects = [];
      // const batchSize = 10; // Firestore allows up to 10 'in' queries per batch

      // // Batch queries to Firestore to retrieve projects associated with user's groups
      // for (let i = 0; i < groupIds.length; i += batchSize) {
      //   const groupIdsBatch = groupIds.slice(i, i + batchSize);
      //   const projectsQuery = query(
      //     collection(firebaseFirestore, 'projects'),
      //     where('groupId', 'in', groupIdsBatch)
      //   );

      //   const projectDocs = await getDocs(projectsQuery);
      //   projectDocs.forEach(doc => {
      //     projects.push({ id: doc.id, ...doc.data() });
      //   });
      // }

      return true;
    } catch (error) {
      console.error("Error fetching user projects:", error);
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
      .addCase(FETCH_USER_PROJECTS.pending, (state) => {
        state.status = "loading";
      })
      .addCase(FETCH_USER_PROJECTS.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.projects = action.payload;
      })
      .addCase(FETCH_USER_PROJECTS.rejected, (state, action) => {
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
