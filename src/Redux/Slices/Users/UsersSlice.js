// src/features/users/usersSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { firebaseAuth } from "../../../Firebase/getFirebase";

export const registerUser = createAsyncThunk(
  "users/registerUser",
  async ({ email, password, name }) => {
    const userCredential = await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    const user = userCredential.user;
    await setDoc(doc(firebaseAuth, "users", user.uid), {
      uid: user.uid,
      name,
      email,
    });
    return { uid: user.uid, name, email };
  }
);

export const loginUser = createAsyncThunk(
  "users/loginUser",
  async ({ email, password }) => {
    const userCredential = await signInWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    const user = userCredential.user;
    const userDoc = await getDoc(doc(firebaseAuth, "users", user.uid));
    return userDoc.data();
  }
);

export const logoutUser = createAsyncThunk("users/logoutUser", async () => {
  await signOut(firebaseAuth);
});

const usersSlice = createSlice({
  name: "users",
  initialState: {
    currentUser: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentUser = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentUser = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = "succeeded";
        state.currentUser = null;
      });
  },
});

export default usersSlice.reducer;
