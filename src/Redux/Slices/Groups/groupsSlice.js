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
  writeBatch,
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
import { fetchUserByEmail } from "../Users/UsersSlice";
import { fetchGroupsBatch } from "../../../Firebase/firestoreFunctions";
import { uploadGroupImage } from "../../../Firebase/storageFunctions";

// export const createGroupOnly = createAsyncThunk(
//   "groups/createGroupOnly",
//   async ({ groupName, groupIcon, members }, { rejectWithValue }) => {
//     try {
//       const auth = getAuth();
//       const currentUser = auth.currentUser;
//       // Upload group icon to Firebase Storage if it exists
//       let groupIconUrl = "";
//       if (groupIcon) {
//         const iconRef = ref(
//           firebaseStorage,
//           `group_icons/${groupName}_${Date.now()}`
//         );
//         const snapshot = await uploadBytes(iconRef, groupIcon);
//         groupIconUrl = await getDownloadURL(snapshot.ref);
//       }

//       // Ensure members array only contains emails
//       const membersId = members.map((member) => member.userid);

//       // Add group data to Firestore
//       const groupData = {
//         groupName: groupName,
//         groupIcon: groupIconUrl,
//         pendingMembers: [...membersId],
//         currentMembers: [currentUser.uid, ...membersId],
//         createdAt: Timestamp.now(),
//         groupAdmin: currentUser.uid,
//       };

//       const groupDocRef = await addDoc(
//         collection(firebaseFirestore, "groups"),
//         groupData
//       );

//       return {
//         id: groupDocRef.id,
//         ...groupData,
//       };
//     } catch (error) {
//       console.log("Error Creating group", error);
//       return rejectWithValue(error.message);
//     }
//   }
// );

// Async thunk to create a group
export const CREATE_USER_GROUPS = createAsyncThunk(
  "groups/CREATE_USER_GROUPS",
  async (
    { groupData, userId, imageFile, invitedEmails },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const batch = writeBatch(firebaseFirestore);
      // Upload image and get URL
      const imageUrl = imageFile
        ? await dispatch(
            uploadGroupImage({ file: imageFile, groupName: groupData })
          ).unwrap()
        : undefined;

      // Prepare group document
      const groupRef = doc(collection(firebaseFirestore, "groups"));
      const groupId = groupRef.id; // Get the generated ID
      const extractedInvites = invitedEmails.map((invitee, index) => ({
        userid: invitee.userid,
        role: "member",
        joinedAt: new Date(),
      }));

      const groupDoc = {
        groupData,
        createdAt: new Date(),
        ownerId: userId,
        members: [
          {
            userid: userId,
            role: "owner",
            joinedAt: new Date(),
          },
          ...extractedInvites,
        ],
        pendingInvitations: [...extractedInvites],
        imageUrl,
      };

      batch.set(groupRef, groupDoc);

      // Update user document to add the new group
      const userRef = doc(firebaseFirestore, "users", userId);
      const userDoc = await getDoc(userRef);
      const existingGroups = userDoc.exists()
        ? userDoc.data().groups || []
        : [];

      // Create a new group entry
      const newGroupEntry = {
        groupId,
        role: "owner",
        joinedAt: new Date(),
        createdBy: true,
      };

      // Merge the new group with the existing ones
      const updatedGroups = [...existingGroups, newGroupEntry];

      // Update the user document
      batch.update(userRef, { groups: updatedGroups });

      // // Commit batch
      await batch.commit();
      return {
        id: groupRef.id,
        ...groupData,
      };
    } catch (error) {
      console.log("error/CREATE_USER_GROUPS", error);
    }
  }
);

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

      const groupIds = userData.groups.map((group) => group.groupId); // Assuming `groups` is an array of objects with `groupId`

      if (groupIds.length === 0) {
        return []; // Return an empty array if no groups
      }
      // Fetch groups documents
      const groups = [];
      const batchSize = 10; // Firestore limit for `in` queries

      for (let i = 0; i < groupIds.length; i += batchSize) {
        const batchIds = groupIds.slice(i, i + batchSize);

        const groupsQuery = query(
          collection(firebaseFirestore, "groups"),
          where("__name__", "in", batchIds)
        );

        const querySnapshot = await getDocs(groupsQuery);

        const batchGroups = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        groups.push(...batchGroups);
      }
      // console.log("SOMEONE IS INSIDE WITH DETAILS", groups);
      return groups;
    } catch (error) {
      console.error("Error groups/fetchUserGroups", error);
      return rejectWithValue(error.message);
    }
  }
);
// AsyncThunk for fetching members of a group
export const fetchGroupMembers = createAsyncThunk(
  "groups/fetchGroupMembers",
  async (groupId, { rejectWithValue }) => {
    try {
      const groupDoc = doc(firebaseFirestore, "groups", groupId);
      const groupSnapshot = await getDoc(groupDoc);

      if (!groupSnapshot.exists()) {
        throw new Error("Group not found");
      }

      const groupData = groupSnapshot.data();
      const memberIds = groupData.members.map((member) => member.userid); // Array of user IDs

      // console.log(memberIds);

      if (memberIds.length === 0) {
        return [];
      }

      // Fetch user details for each member ID
      const usersRef = collection(firebaseFirestore, "users");
      const userPromises = memberIds.map((id) => getDoc(doc(usersRef, id)));
      const userSnapshots = await Promise.all(userPromises);

      const groupmembers = userSnapshots.map((snapshot) => ({
        id: snapshot.id,
        ...snapshot.data(),
      }));
      // console.log(groupmembers);
      return groupmembers;
    } catch (error) {
      console.log("error/fetchgroupmembers", error);
      rejectWithValue(error);
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
    setCurrentGroup: (state, action) => {
      state.CURRENT_GROUP_DETAILS = action.payload;
    },
    clearGroupDetails(state) {
      state.CURRENT_GROUP_DETAILS = null;
      state.groupsError = null;
    },
    addProject: (state, action) => {
      state.projects.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(CREATE_USER_GROUPS.pending, (state) => {
        state.GROUP_SLICE_STATUS = "loading";
        state.GROUP_SLICE_ISLOADING = true;
      })
      .addCase(CREATE_USER_GROUPS.fulfilled, (state) => {
        state.GROUP_SLICE_STATUS = "completed";
        state.GROUP_SLICE_ISLOADING = false;
      })
      .addCase(CREATE_USER_GROUPS.rejected, (state, action) => {
        state.GROUP_SLICE_STATUS = "failed";
        state.error = action.payload;
        state.GROUP_SLICE_ISLOADING = false;
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

      // Fetch members of group actual details
      .addCase(fetchGroupMembers.pending, (state) => {
        state.GROUP_SLICE_STATUS = "loading";
      })
      .addCase(fetchGroupMembers.fulfilled, (state, action) => {
        state.GROUP_SLICE_STATUS = "completed";
        state.groupMembers = action.payload;
      })
      .addCase(fetchGroupMembers.rejected, (state, action) => {
        state.GROUP_SLICE_STATUS = "failed";
        state.GROUP_SLICE_ERROR = action.error.message;
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
      });
  },
});

export const { setGroups, setCurrentGroup, clearGroupDetails, addProject } =
  groupsSlice.actions;
export const selectUserGroups = (state) => state.groups.GROUPS;
export const selectGroupID = (state) => state.groups.selectedGroupId;
export const selectGroupProjects = (state) => state.groups.groupProjects;
export const selectActiveProject = (state) => state.groups.activeProject;
export const selectGroupMembers = (state) => state.groups.groupMembers;
export const selectGroupStatus = (state) => state.groups.status;
export default groupsSlice.reducer;
