import { createSlice } from "@reduxjs/toolkit";

const firebaseSlice = createSlice({
  name: "firebase",
  initialState: {
    currentUser: null,
    error: false,
    loading: false,
    initializing: true,
    count:10
  },
  reducers:{}
});

export default firebaseSlice.reducer
