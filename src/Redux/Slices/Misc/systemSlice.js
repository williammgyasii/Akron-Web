import { createSlice } from "@reduxjs/toolkit";

const systemSlice = createSlice({
  name: "App Slice",
  initialState: {
    loginQuote: "",
    appInit:false
  },
  reducers: {
    setLoginQuote: (state, action) => {
      state.loginQuote = action.payload;
    },
  },
});

export const { setLoginQuote } = systemSlice.actions;
export default systemSlice.reducer;
