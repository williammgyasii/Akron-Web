import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { setUser, toggleInitState } from "../Firebase/firebaseSlice";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth, firestoreDB } from "../Firebase/getFirebase";
import { getDoc } from "firebase/firestore";

function RootLayout() {
  const dispatch = useDispatch();
  const stateInit = useSelector((state) => state.firebase.initializing);
  onAuthStateChanged(firebaseAuth, async (user) => {
    if (user) {
      dispatch(toggleInitState());
      const userDoc = await getDoc(getDoc(firestoreDB, "users", user.uid));
      if (userDoc.exists()) {
        dispatch(setUser({ ...user, role: userDoc.data().role }));
      }
    } else {
        console.log("user didnt exist")
      dispatch(toggleInitState());
      dispatch(setUser(null));
    }
  });
  return stateInit ? <h1>Loading....</h1> : <Outlet />;
}

export default RootLayout;
