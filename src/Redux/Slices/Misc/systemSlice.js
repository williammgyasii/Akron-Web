import { createSlice } from "@reduxjs/toolkit";

const systemSlice = createSlice({
  name: "App Slice",
  initialState: {
    loginQuote: "",
    appInit: false,
    isDrawerOpened: false,
  },
  reducers: {
    setLoginQuote: (state, action) => {
      state.loginQuote = action.payload;
    },
    toggleDrawerIsOpened: (state, action) => {
      state.isDrawerOpened = !state.isDrawerOpened;
    },
  },
});

export const { setLoginQuote, toggleDrawerIsOpened } = systemSlice.actions;
export const selectIsDrawerOpened = (state) => state.system.isDrawerOpened;
export default systemSlice.reducer;
