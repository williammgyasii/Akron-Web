import { createSlice } from "@reduxjs/toolkit";

const systemSlice = createSlice({
  name: "App Slice",
  initialState: {
    loginQuote: "",
    isDrawerOpened: false,
    isAppLoading: false,
  },
  reducers: {
    setLoginQuote: (state, action) => {
      state.loginQuote = action.payload;
    },
    toggleDrawerIsOpened: (state, action) => {
      state.isDrawerOpened = !state.isDrawerOpened;
    },
    showGlobalLoading: (state) => {
      state.isAppLoading = true;
    },
    hideGlobalLoading: (state) => {
      state.isAppLoading = false;
    },
  },
});

export const {
  setLoginQuote,
  toggleDrawerIsOpened,
  showGlobalLoading,
  hideGlobalLoading,
} = systemSlice.actions;

export const selectIsDrawerOpened = (state) => state.system.isDrawerOpened;
export const selectIsAppLoading = (state) => state.system.isAppLoading;
export const selectAppInit = (state) => state.system.appInit;

export default systemSlice.reducer;
