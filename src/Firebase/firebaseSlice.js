// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { firebaseAuth, firestoreDB } from "./getFirebase";

export const LOGIN_USER = createAsyncThunk(
  "firebase/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      return userCredential.user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const REGISTER_USER = createAsyncThunk(
  "firebase/registerUser",
  async ({ email, password, name }, { rejectWithValue }) => {
    try {
      console.log("data recieved in thunk", email, password, name);
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        String(email),
        String(password)
      );
      const user = userCredential.user;
      await setDoc(doc(firestoreDB, "users", user.uid), {
        email: email,
        role: "Cell Leader",
        fullName: name,
      });
      return user;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const LOG_OUT_USER = createAsyncThunk(
  "firebase/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(firebaseAuth);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const firebaseSlice = createSlice({
  name: "firebase",
  initialState: {
    user: null,
    loading: false,
    error: null,
    initializing: true,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    toggleInitState: (state, action) => {
      state.initializing = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(LOGIN_USER.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(LOGIN_USER.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(LOGIN_USER.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(REGISTER_USER.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(REGISTER_USER.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(REGISTER_USER.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(LOG_OUT_USER.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(LOG_OUT_USER.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(LOG_OUT_USER.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setUser, toggleInitState } = firebaseSlice.actions;
export const selectCurrentUser = (state) => state.firebase.user;
export default firebaseSlice.reducer;
