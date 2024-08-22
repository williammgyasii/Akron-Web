// src/Redux/Slices/Members/membersSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebaseConfig"; // Adjust the path to your firebase config

// Async thunk to fetch members by group ID
export const fetchMembersByGroup = createAsyncThunk(
  "members/fetchByGroup",
  async (groupId) => {
    const membersRef = collection(db, "groups", groupId, "members");
    const q = query(membersRef);
    const querySnapshot = await getDocs(q);
    const members = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return members;
  }
);

const membersSlice = createSlice({
  name: "members",
  initialState: {
    members: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMembersByGroup.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMembersByGroup.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.members = action.payload;
      })
      .addCase(fetchMembersByGroup.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default membersSlice.reducer;
