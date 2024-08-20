// src/features/groups/groupsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";
import { firebaseFirestore } from "../../../Firebase/getFirebase";
import firebase from "firebase/compat/app";
import { formatTimestamp } from "../../../Utils/dateFunctions";

export const fetchGroups = createAsyncThunk("groups/fetchGroups", async () => {
  const querySnapshot = await getDocs(collection(firebaseFirestore, "groups"));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
});

// Fetch group details thunk
export const fetchSelectedGroupDetails = createAsyncThunk(
  "group/fetchGroupDetails",
  async (groupId, { rejectWithValue }) => {
    try {
      const groupDoc = doc(firebaseFirestore, "groups", groupId);
      const groupSnapshot = await getDoc(groupDoc);

      if (!groupSnapshot.exists()) {
        throw new Error("Group not found");
      }

      const { createdAt, ...dataExtract } = groupSnapshot.data();

      const groupDetails = {
        createdAt: formatTimestamp(groupSnapshot.data().createdAt),
        ...dataExtract,
      };

      return groupDetails;
    } catch (error) {
      console.log("group/fetchGroupDetails", error);
      return rejectWithValue(error.message);
    }
  }
);

export const addGroup = createAsyncThunk(
  "groups/addGroup",
  async (groupData) => {
    const docRef = await addDoc(
      collection(firebaseFirestore, "groups"),
      groupData
    );
    return { id: docRef.id, ...groupData };
  }
);

export const fetchUserGroups = createAsyncThunk(
  "groups/fetchUserGroups",
  async (userId, { rejectWithValue }) => {
    try {
      const groupsQuery = query(
        collection(firebaseFirestore, "groups"),
        where("members", "array-contains", userId)
      );
      const querySnapshot = await getDocs(groupsQuery);
      // const createdAt = data.createdAt?.toDate();
      const userGroups = querySnapshot.docs.map((doc) => {
        const { createdAt, ...restofData } = doc.data();
        return {
          id: doc.id,
          createdAt: formatTimestamp(doc.data().createdAt),
          ...restofData,
        };
      });
      // console.log(userGroups);
      return userGroups;
    } catch (error) {
      console.log("groups/fetchUserGroups", error);
      return rejectWithValue(error.message);
    }
  }
);

const groupsSlice = createSlice({
  name: "groups",
  initialState: {
    groups: [],
    groupProjects: [
      { projectName: "Cell Ministry" },
      { projectName: "Banku" },
      { projectName: "ShiSha" },
      { projectName: "Cassava" },
    ],
    status: "idle",
    selectedGroupId: "",
    selectedGroupDetails: null,
    groupsError: null,
  },
  reducers: {
    setGroups: (state, action) => {
      state.groups = action.payload;
    },
    setSelectedGroupID: (state, action) => {
      state.selectedGroupId = action.payload;
    },
    setSelectedGroupInfo: (state, action) => {
      state.selectedGroupInfo = action.payload;
    },
    clearGroupDetails(state) {
      state.selectedGroupDetails = null;
      state.groupsError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroups.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.groups = action.payload;
      })
      .addCase(fetchGroups.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(addGroup.fulfilled, (state, action) => {
        state.groups.push(action.payload);
      })
      //FETEHC USER GROUPS
      .addCase(fetchUserGroups.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserGroups.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.groups = action.payload;
      })
      .addCase(fetchUserGroups.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      //FETCH SINGLE GROUP DETAILS
      .addCase(fetchSelectedGroupDetails.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchSelectedGroupDetails.fulfilled, (state, action) => {
        state.selectedGroupDetails = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchSelectedGroupDetails.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      });
  },
});

export const { setGroups, setSelectedGroupID, clearGroupDetails } =
  groupsSlice.actions;
export const selectGroups = (state) => state.groups.groups;
export const selectGroupID = (state) => state.groups.selectedGroupId;
export const selectGroupProjects = (state) => state.groups.groupProjects;
export default groupsSlice.reducer;
