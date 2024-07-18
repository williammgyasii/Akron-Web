// src/features/groups/groupsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { firebaseFirestore } from '../../../Firebase/getFirebase';

export const fetchGroups = createAsyncThunk('groups/fetchGroups', async () => {
  const querySnapshot = await getDocs(collection(firebaseFirestore, 'groups'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
});

export const addGroup = createAsyncThunk('groups/addGroup', async (groupData) => {
  const docRef = await addDoc(collection(firebaseFirestore, 'groups'), groupData);
  return { id: docRef.id, ...groupData };
});

const groupsSlice = createSlice({
  name: 'groups',
  initialState: {
    groups: [],
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroups.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.groups = action.payload;
      })
      .addCase(fetchGroups.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(addGroup.fulfilled, (state, action) => {
        state.groups.push(action.payload);
      });
  },
});

export default groupsSlice.reducer;
