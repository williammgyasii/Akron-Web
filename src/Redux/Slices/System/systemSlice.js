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
    modalView: "",
    welcomModalOpened: false,
  },
  reducers: {
    setLoginQuote: (state, action) => {
      state.loginQuote = action.payload;
    },
    toggleDrawerIsOpened: (state, action) => {
      state.isDrawerOpened = !state.isDrawerOpened;
    },
    setWelcomeModalOpen: (state, action) => {
      state.welcomModalOpened = true;
    },
    setWelcomeModalClose: (state, action) => {
      state.setWelcomeModalOpen = false;
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
    showModal: (state, action) => {
      state.modalView = action.payload;
      state.isModalOpened = true;
    },
    hideModal: (state) => {
      state.isModalOpened = false;
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
} = systemSlice.actions;

export const selectIsDrawerOpened = (state) => state.system.isDrawerOpened;
export const selectIsAppLoading = (state) => state.system.isAppLoading;
export const selectIsSnackBarOpened = (state) => state.system.isSnackBarOpened;
export const selectIsModalOpened = (state) => state.system.isModalOpened;
export const selectAppInit = (state) => state.system.appInit;
export const selectModalView = (state) => state.system.modalView;
export const selectWelcomeModalOpened = (state) =>state.system.welcomModalOpened;
export default systemSlice.reducer;
