import { createSlice } from "@reduxjs/toolkit";

const projectsSlice = createSlice({
  name: "Projects",
  initialState: {
    projects: [],
    activeProject: null,
    PROJECT_SLICE_ISLOADING: false,
    PROJECT_SLICE_STATUS: "idle",
  },
  reducers: {},
});

export default projectsSlice.reducer;
