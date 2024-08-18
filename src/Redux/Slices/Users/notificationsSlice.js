// src/features/notifications/notificationsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    notifications: [
      { text: 'Notification 1' },
      { text: 'Notification 2' },
      { text: 'Notification 3' },
      { text: 'Notification 4' },
      { text: 'Notification 5' },
      { text: 'Notification 6' }, // Example of more notifications
    ],
  },
  reducers: {
    addNotification: (state, action) => {
      state.notifications.push(action.payload);
    },
  },
});

export const { addNotification } = notificationsSlice.actions;
export default notificationsSlice.reducer;
