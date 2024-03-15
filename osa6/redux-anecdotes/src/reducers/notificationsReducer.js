import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotification: (state, action) => {
      return action.payload;
    },
    clearNotification: () => {
      return "";
    },
  },
});

export const selectNotification = (state) => state.notifications;

export const { setNotification, clearNotification } =
  notificationsSlice.actions;
export default notificationsSlice.reducer;
