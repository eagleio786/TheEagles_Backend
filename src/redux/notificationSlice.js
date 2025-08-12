import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    totalNotifications: 0,
    newNotifications: 0,
    lastSeenNotificationCount: 0,
    notifications: [], // v1
  },
  reducers: {
    updateNotifications: (state, action) => {
      const { totalNotifications, notifications } = action.payload;
      state.totalNotifications = totalNotifications;
      state.notifications = notifications || []; // v1

      // Only update new notifications if it's the first time or
      // if there are more notifications than last seen
      if (state.lastSeenNotificationCount === 0) {
        state.newNotifications = totalNotifications;
      } else if (totalNotifications > state.lastSeenNotificationCount) {
        state.newNotifications =
          totalNotifications - state.lastSeenNotificationCount;
      }
    },
    resetNewNotifications: (state) => {
      // When resetting, update the last seen count
      state.lastSeenNotificationCount = state.totalNotifications;
      state.newNotifications = 0;
    },
    setNotifications: (state, action) => {
      const { notifications } = action.payload;
      state.notifications = notifications;
      state.totalNotifications = notifications.length;
    },
  },
});

export const { updateNotifications, resetNewNotifications, setNotifications } =
  notificationSlice.actions;
export default notificationSlice.reducer;
