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
import { getAuthErrorMessage } from "../../../Utils/authErrors";

export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (formValues, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        formValues.email,
        formValues.password
      );
      const user = userCredential.user;
      const { password, ...rest } = formValues;
      await setDoc(doc(firebaseFirestore, "users", user.uid), {
        uid: user.uid,
        ...rest,
      });
      // return { uid: user.uid, note: "redux/registerSlice", ...rest };
    } catch (error) {
      // console.log(error.code)
      const errorMessage = getAuthErrorMessage(error.code);
      return rejectWithValue(errorMessage);
    }
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
      return { userId: user.uid, ...userDoc.data() };
    } catch (error) {
      // console.log(error.code)
      const errorMessage = getAuthErrorMessage(error.code);
      return rejectWithValue(errorMessage);
    }
  }
);

export const logoutUser = createAsyncThunk(
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
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(
        firebaseAuth,
        async (user) => {
          if (user) {
            // Fetch user data from Firestore
            const userDoc = await getDoc(
              doc(firebaseFirestore, "users", user.uid)
            );
            if (userDoc.exists()) {
              const userStructure = {
                note: "New User Structure",
                userId: user.uid,
                ...userDoc.data(),
              };
              console.log("SOMEONE IS INSIDE WITH DETAILS", userStructure);
              // dispatch(setUser(userStructure));
            }
          } else {
            // dispatch(clearUser());
          }
          resolve();
        },
        (error) => {
          reject(error);
        }
      );

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
      state.currentUser = action.payload;
      state.loading = false;
    },
    clearUser(state) {
      state.currentUser = null;
      state.loading = false;
    },
    clearError(state) {
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentUser = action.payload;
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.loading = false;
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
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = "succeeded";
        state.currentUser = null;
      })

      //Auth Changes
      .addCase(listenForAuthChanges.pending, (state, action) => {
        console.log("listening....");
        state.loading = true;
      })
      .addCase(listenForAuthChanges.fulfilled, (state, action) => {
        console.log("listening ending....");
        state.currentUser = action.payload;
        state.loading = false;
      });
  },
});

export const { setUser, clearUser, clearError } = usersSlice.actions;

export const selectCurrentUser = (state) => state.user.currentUser;
export default usersSlice.reducer;
