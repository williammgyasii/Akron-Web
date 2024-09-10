// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import groupsReducer from "./Slices/Groups/groupsSlice";
import taskReducer from "./Slices/Tasks/tasksSlice";
import userReducer from "./Slices/Users/UsersSlice";
import notificationsReducer from "./Slices/Users/notificationsSlice";
import systemReducer from "./Slices/System/systemSlice";
import projectsReducer from "./Slices/Projects/projectsSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  groups: groupsReducer,
  tasks: taskReducer,
  user: userReducer,
  system: systemReducer,
  notifications: notificationsReducer,
  projects: projectsReducer,
});

const appReducer = (state, action) => {
  if (action.type === "RESET_STATE") {
    state = undefined;
  }
  return rootReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const resetState = () => ({
  type: "RESET_STATE",
});

export const persistor = persistStore(store);
