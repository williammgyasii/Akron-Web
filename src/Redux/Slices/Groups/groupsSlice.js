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

// AsyncThunk for creating a group
export const createGroup = createAsyncThunk(
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
// AsyncThunk for fetching groups of a user
export const fetchUserGroups = createAsyncThunk(
  "groups/fetchUserGroups",
  async (userId, { rejectWithValue }) => {
    try {
      const groupsQuery = query(
        collection(firebaseFirestore, "groups"),
        where("currentMembers", "array-contains", userId)
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

      console.log(memberIds);

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
    console.log("projects/fetchProjectsByGroupId", groupId, userId);
    try {
      const q = query(
        collection(firebaseFirestore, "projects"),
        where("groupId", "==", groupId),
        where("members", "array-contains", userId)
      );

      const querySnapshot = await getDocs(q);
      console.log(querySnapshot);
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
    groups: [],
    status: "idle",
    selectedGroupId: "",
    selectedGroupDetails: null,
    groupsError: null,
    createGroupLoading: false,
    groupProjects: [],
    selectedProject: null,
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
      state.selectedProject = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
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
      .addCase(createGroup.pending, (state) => {
        state.createGroupLoading = true;
      })
      .addCase(createGroup.fulfilled, (state, action) => {
        state.createGroupLoading = false;
        state.groups.push(action.payload);
      })
      .addCase(createGroup.rejected, (state, action) => {
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

export const {
  setGroups,
  setSelectedGroupID,
  clearGroupDetails,
  addProject,
  setSelectedProject,
} = groupsSlice.actions;
export const selectGroups = (state) => state.groups.groups;
export const selectGroupID = (state) => state.groups.selectedGroupId;
export const selectGroupProjects = (state) => state.groups.groupProjects;
export const selectCurrentProject = (state) => state.groups.selectedProject;
export const selectGroupMembers = (state) => state.groups.groupMembers;
export const selectGroupStatus = (state) => state.groups.status;
export default groupsSlice.reducer;
