// src/features/users/usersSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
  query,
  collection,
  getDocs,
  where,
} from "firebase/firestore";
import { firebaseAuth, firebaseFirestore } from "../../../Firebase/getFirebase";
import { getAuthErrorMessage } from "../../../Utils/authErrors";
import { FETCH_USER_GROUPS, fetchUserGroups } from "../Groups/groupsSlice";

export const REGISTER_USER = createAsyncThunk(
  "auth/registerUser",
  async (formValues, { rejectWithValue }) => {
    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        formValues.email,
        formValues.password
      );
      const user = userCredential.user;

      const { password, ...rest } = formValues;

      // Save user data to Firestore
      await setDoc(doc(firebaseFirestore, "users", user.uid), {
        uid: user.uid,
        createdAt: serverTimestamp(),
        groups: [],
        role: "admin", // Default role
        ...rest,
      });

      return { uid: user.uid, ...rest, role: "admin" };
    } catch (error) {
      return rejectWithValue(error.message);
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
  async (_, { rejectWithValue, dispatch }) => {
    try {
      signOut(firebaseAuth);
      dispatch(clearUser());
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to fetch user by email
export const fetchUserByEmail = createAsyncThunk(
  "users/fetchUserByEmail",
  async (email, { rejectWithValue }) => {
    const usersRef = collection(firebaseFirestore, "users");
    const q = query(usersRef, where("email", "==", email)); // Query Firestore by email

    try {
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        throw new Error(`No user found with the email: ${email}`);
      }

      // Assuming that email is unique and we will get only one document
      const user = querySnapshot.docs[0].data();
      user.uid = querySnapshot.docs[0].id; // Adding the user ID to the result
      return user;
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
              
              dispatch(setUser(userStructure));
            }
          } else {
            dispatch(clearUser());
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
    loading: true,
  },
  reducers: {
    setUser(state, action) {
      state.currentUser = action.payload;
      state.USER_SLICE_IS_LOADING = false;
    },
    clearUser(state) {
      state.currentUser = null;
      state.USER_SLICE_IS_LOADING = false;
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
      .addCase(REGISTER_USER.pending, (state) => {
        state.status = "loading";
        state.USER_SLICE_IS_LOADING = true;
      })
      .addCase(REGISTER_USER.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentUser = action.payload;
        state.USER_SLICE_IS_LOADING = false;
      })
      .addCase(REGISTER_USER.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.USER_SLICE_IS_LOADING = false;
      })

      //LOGIN USER FUNCTIONS
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.USER_SLICE_IS_LOADING = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentUser = action.payload;
        state.USER_SLICE_IS_LOADING = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.USER_SLICE_IS_LOADING = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = "succeeded";
        state.currentUser = null;
      })

      //Auth Changes
      .addCase(listenForAuthChanges.pending, (state, action) => {
        console.log("listening....");
        state.USER_SLICE_IS_LOADING = true;
      })
      .addCase(listenForAuthChanges.fulfilled, (state, action) => {
        console.log("listening ending....");
        state.USER_SLICE_IS_LOADING = false;
      });
  },
});

export const { setUser, clearUser, clearError } = usersSlice.actions;

export const selectCurrentUser = (state) => state.user.currentUser;
export default usersSlice.reducer;
