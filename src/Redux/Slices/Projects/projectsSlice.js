import { createSlice } from "@reduxjs/toolkit";

const projectsSlice = createSlice({
  name: "Projects",
  initialState: {
    groupProjects: [],
    activeProject: null,
    groupMembers: [],
    PROJECT_SLICE_ISLOADING: false,
    PROJECT_SLICE_STATUS: "idle",
  },
  reducers: {},
});

export default projectsSlice.reducer;
