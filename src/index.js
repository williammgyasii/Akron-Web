import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider, useDispatch, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./Redux/store";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./Utils/getTheme";
import {
  listenForAuthChanges,
  selectCurrentUser,
} from "./Redux/Slices/Users/UsersSlice";
import GlobalLoading from "./Components/GlobalLoading";
import GlobalSnackbar from "./Components/GlobalSnackbar";
import { fetchUserGroups } from "./Redux/Slices/Groups/groupsSlice";

const AuthListener = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    dispatch(listenForAuthChanges());
    // dispatch(fetchUserGroups());
  }, [dispatch]);

  return null;
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthListener />
          <GlobalSnackbar />
          {/* <GlobalLoading/> */}
          <App />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
