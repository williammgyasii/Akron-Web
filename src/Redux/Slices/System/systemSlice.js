import { createSlice } from "@reduxjs/toolkit";

const systemSlice = createSlice({
  name: "App Slice",
  initialState: {
    loginQuote: "",
    isDrawerOpened: false,
    isAppLoading: false,
    isSnackBarOpened: false,
    snackbarMessage: "",
    snackbarState: "info", //'success', 'warning', 'error'
    isModalOpened: false,
    
  },
  reducers: {
    setLoginQuote: (state, action) => {
      state.loginQuote = action.payload;
    },
    toggleDrawerIsOpened: (state, action) => {
      state.isDrawerOpened = !state.isDrawerOpened;
    },
    closeDrawer: (state, action) => {
      state.isDrawerOpened = false;
    },
    showGlobalLoading: (state) => {
      state.isAppLoading = true;
    },
    hideGlobalLoading: (state) => {
      state.isAppLoading = false;
    },
    openSnackbar: (state, action) => {
      state.isSnackBarOpened = true;
      state.snackbarMessage = action.payload.message;
      state.snackbarState = action.payload.severity || "info";
    },
    closeSnackbar: (state) => {
      state.isSnackBarOpened = false;
      state.snackbarMessage = "";
      state.snackbarState = "info";
    },
    showModal: (state) => {
      state.isModalOpened = true;
    },
    hideModal: (state) => {
      state.isModalOpened = false;
    },
    setActiveProject: (state, action) => {
      state.isActiveProject = action.payload;
    },
  },
});

export const {
  setLoginQuote,
  toggleDrawerIsOpened,
  showGlobalLoading,
  hideGlobalLoading,
  closeDrawer,
  openSnackbar,
  closeSnackbar,
  showModal,
  hideModal,
  setActiveProject
} = systemSlice.actions;

export const selectIsDrawerOpened = (state) => state.system.isDrawerOpened;
export const selectIsAppLoading = (state) => state.system.isAppLoading;
export const selectIsSnackBarOpened = (state) => state.system.isSnackBarOpened;
export const selectIsModalOpened = (state) => state.system.isModalOpened;
export const selectAppInit = (state) => state.system.appInit;
export const selectIsActiveProject = (state) => state.system.isActiveProject;

export default systemSlice.reducer;
