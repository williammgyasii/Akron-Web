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
  Timestamp,
  or,
} from "firebase/firestore";
import {
  firebaseAuth,
  firebaseFirestore,
  firebaseStorage,
} from "../../../Firebase/getFirebase";
import { formatTimestamp } from "../../../Utils/dateFunctions";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { addProjectToGroup } from "../../../Firebase/firebaseFunctions";

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

// AsyncThunk for creating a group and project
export const createGroupWithProject = createAsyncThunk(
  "groups/createGroup",
  async (
    { groupName, groupIcon, members, projectValues },
    { rejectWithValue }
  ) => {
    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      // Upload group icon to Firebase Storage if it exists
      let groupIconUrl = "";
      if (groupIcon) {
        const iconRef = ref(
          firebaseStorage,
          `group_icons/${groupName}_${Date.now()}`
        );
        const snapshot = await uploadBytes(iconRef, groupIcon);
        groupIconUrl = await getDownloadURL(snapshot.ref);
      }

      // Ensure members array only contains emails
      const membersId = members.map((member) => member.userid);

      // Add group data to Firestore
      const groupData = {
        groupName: groupName,
        groupIcon: groupIconUrl,
        pendingMembers: [...membersId],
        currentMembers: [currentUser.uid, ...membersId],
        createdAt: Timestamp.now(),
        groupAdmin: currentUser.uid,
      };

      const groupDocRef = await addDoc(
        collection(firebaseFirestore, "groups"),
        groupData
      );

      const projectData = {
        projectTitle: projectValues.projectTitle.value,
        projectDescription: projectValues.projectDescription.value,
        groupId: groupDocRef.id,
        createdBy: currentUser.uid,
      };

      const newProjectStructure = await addProjectToGroup(
        projectData,
        groupDocRef.id
      );
      return {
        id: groupDocRef.id,
        ...newProjectStructure,
        ...groupData,
      };
    } catch (error) {
      console.log("Error Creating group", error);
      return rejectWithValue(error.message);
    }
  }
);

// AsyncThunk for creating a group and project
export const createGroupOnly = createAsyncThunk(
  "groups/createGroupOnly",
  async ({ groupName, groupIcon, members }, { rejectWithValue }) => {
    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      // Upload group icon to Firebase Storage if it exists
      let groupIconUrl = "";
      if (groupIcon) {
        const iconRef = ref(
          firebaseStorage,
          `group_icons/${groupName}_${Date.now()}`
        );
        const snapshot = await uploadBytes(iconRef, groupIcon);
        groupIconUrl = await getDownloadURL(snapshot.ref);
      }

      // Ensure members array only contains emails
      const membersId = members.map((member) => member.userid);

      // Add group data to Firestore
      const groupData = {
        groupName: groupName,
        groupIcon: groupIconUrl,
        pendingMembers: [...membersId],
        currentMembers: [currentUser.uid, ...membersId],
        createdAt: Timestamp.now(),
        groupAdmin: currentUser.uid,
      };

      const groupDocRef = await addDoc(
        collection(firebaseFirestore, "groups"),
        groupData
      );

      return {
        id: groupDocRef.id,
        ...groupData,
      };
    } catch (error) {
      console.log("Error Creating group", error);
      return rejectWithValue(error.message);
    }
  }
);

// Function to batch group fetching if user has more than 10 groups
const fetchGroupsBatch = async (groupIdsBatch) => {
  const groupQuery = query(
    collection(firebaseFirestore, "groups"),
    where("groupId", "in", groupIdsBatch)
  );
  const groupSnapshot = await getDocs(groupQuery);
  return groupSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
// AsyncThunk for fetching groups of a user
export const FETCH_USER_GROUPS = createAsyncThunk(
  "groups/fetchUserGroups",
  async (uid, { rejectWithValue }) => {
    try {
      // Fetch user document
      const userDocRef = doc(firebaseFirestore, "users", uid);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        throw new Error("User does not exist");
      }

      // Extract group IDs from user document
      const userData = userDocSnap.data();
      const groupIds = userData.groups || [];

      if (groupIds.length === 0) {
        return []; // Return an empty array if no groups
      }

      const groups = [];

      // Firestore only allows 10 `in` queries at a time, so we batch requests
      const batchSize = 10;
      for (let i = 0; i < groupIds.length; i += batchSize) {
        const groupIdsBatch = groupIds.slice(i, i + batchSize);
        const batchGroups = await fetchGroupsBatch(groupIdsBatch);
        groups.push(...batchGroups);
      }
      return groups;
    } catch (error) {
      console.error("Error fetching groups:", error.message);
      return rejectWithValue(error.message);
    }
  }
);
// AsyncThunk for fetching members of a group
export const fetchGroupMembers = createAsyncThunk(
  "groups/fetchGroupMembers",
  async (groupId) => {
    try {
      const groupDoc = doc(firebaseFirestore, "groups", groupId);
      const groupSnapshot = await getDoc(groupDoc);

      if (!groupSnapshot.exists()) {
        throw new Error("Group not found");
      }

      const groupData = groupSnapshot.data();
      const memberIds = groupData.currentMembers; // Array of user IDs

      // console.log(memberIds);

      if (memberIds.length === 0) {
        return [];
      }

      // Fetch user details for each member ID
      const usersRef = collection(firebaseFirestore, "users");
      const userPromises = memberIds.map((id) => getDoc(doc(usersRef, id)));
      const userSnapshots = await Promise.all(userPromises);

      const users = userSnapshots.map((snapshot) => ({
        id: snapshot.id,
        ...snapshot.data(),
      }));
      return users;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

// Async thunk to fetch projects by groupId
export const fetchProjectsByGroupId = createAsyncThunk(
  "projects/fetchProjectsByGroupId",
  async ({ groupId, userId }, { rejectWithValue }) => {
    // console.log("projects/fetchProjectsByGroupId", groupId, userId);
    try {
      const q = query(
        collection(firebaseFirestore, "projects"),
        where("groupId", "==", groupId),
        where("members", "array-contains", userId)
      );

      const querySnapshot = await getDocs(q);
      // console.log(querySnapshot);
      const projects = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return projects;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

const groupsSlice = createSlice({
  name: "groups",
  initialState: {
    GROUPS: [],
    GROUP_SLICE_STATUS: "idle",
    GROUP_SLICE_ISLOADING: false,
    CURRENT_GROUP_ID: "",
    CURRENT_GROUP_DETAILS: null,
    GROUP_SLICE_ERROR: null,
    groupProjects: [],
    activeProject: null,
    groupMembers: [],
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
    addProject: (state, action) => {
      state.projects.push(action.payload);
    },
    setSelectedProject: (state, action) => {
      state.activeProject = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGroupOnly.pending, (state) => {
        state.createGroupLoading = true;
      })
      .addCase(createGroupOnly.fulfilled, (state, action) => {
        state.createGroupLoading = false;
        state.groups.push(action.payload);
      })
      .addCase(createGroupOnly.rejected, (state, action) => {
        state.createGroupLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchProjectsByGroupId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProjectsByGroupId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.groupProjects = action.payload;
      })
      .addCase(fetchProjectsByGroupId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(createGroupWithProject.pending, (state) => {
        state.createGroupLoading = true;
      })
      .addCase(createGroupWithProject.fulfilled, (state, action) => {
        state.createGroupLoading = false;
        state.groups.push(action.payload);
      })
      .addCase(createGroupWithProject.rejected, (state, action) => {
        state.createGroupLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchGroupMembers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGroupMembers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.groupMembers = action.payload;
      })
      .addCase(fetchGroupMembers.rejected, (state, action) => {
        state.status = "failed";
        state.groupsError = action.error.message;
      })

      //FETCH USER GROUPS
      .addCase(FETCH_USER_GROUPS.pending, (state) => {
        state.GROUP_SLICE_STATUS = "loading";
        state.GROUP_SLICE_ISLOADING = true;
      })
      .addCase(FETCH_USER_GROUPS.fulfilled, (state, action) => {
        state.GROUP_SLICE_STATUS = "completed";
        state.GROUPS = action.payload;
        state.GROUP_SLICE_ISLOADING = false;
      })
      .addCase(FETCH_USER_GROUPS.rejected, (state, action) => {
        state.GROUP_SLICE_STATUS = "failed";
        state.error = action.payload;
        state.GROUP_SLICE_ISLOADING = false;
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

export const {
  setGroups,
  setSelectedGroupID,
  clearGroupDetails,
  addProject,
  setSelectedProject,
} = groupsSlice.actions;
export const selectUserGroups = (state) => state.groups.GROUPS;
export const selectGroupID = (state) => state.groups.selectedGroupId;
export const selectGroupProjects = (state) => state.groups.groupProjects;
export const selectActiveProject = (state) => state.groups.activeProject;
export const selectGroupMembers = (state) => state.groups.groupMembers;
export const selectGroupStatus = (state) => state.groups.status;
export default groupsSlice.reducer;
