// src/features/users/usersSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { firebaseAuth, firebaseFirestore } from "../../../Firebase/getFirebase";

export const registerUser = createAsyncThunk(
  "users/registerUser",
  async ({ email, password, name }, { rejectWithValue }) => {
    const userCredential = await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    const user = userCredential.user;
    await setDoc(doc(firebaseFirestore, "users", user.uid), {
      uid: user.uid,
      name,
      email,
    });
    return { uid: user.uid, name, email };
  }
);

export const loginUser = createAsyncThunk(
  "users/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      const user = userCredential.user;
      const userDoc = await getDoc(doc(firebaseFirestore, "users", user.uid));
      if (!userDoc.exists()) {
        throw new Error("User data not found");
      }
      return { user, ...userDoc.data() };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(firebaseAuth);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//LISTEN FOR AUTH CHANGES
export const listenForAuthChanges = createAsyncThunk(
  "auth/listenForAuthChanges",
  async (_, { dispatch }) => {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
        if (user) {
          // Fetch user data from Firestore
          const userDoc = await getDoc(
            doc(firebaseFirestore, "users", user.uid)
          );
          if (userDoc.exists()) {
            dispatch(setUser({ user, ...userDoc.data() }));
          } else {
            dispatch(setUser({ user }));
          }
        } else {
          dispatch(clearUser());
        }
        resolve();
      });

      // Cleanup listener on component unmount
      return unsubscribe;
    });
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    currentUser: null,
    status: "idle",
    error: null,
    loading: false,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.loading = false;
    },
    clearUser(state) {
      state.user = null;
      state.loading = false;
    },
    clearError(state) {
      state.error = null;
    },
  },
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

      //LOGIN USER FUNCTIONS
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentUser = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = "succeeded";
        state.currentUser = null;
      })

      //Auth Changes
      .addCase(listenForAuthChanges.pending, (state) => {
        state.loading = true;
      })
      .addCase(listenForAuthChanges.fulfilled, (state) => {
        state.loading = false;
      });
  },
});

export const { setUser, clearUser, clearError } = usersSlice.actions;

export const selectCurrentUser = (state) => state.user.currentUser;
export default usersSlice.reducer;
