import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, action) => {
      return action.payload;
    },
    clearNotification: () => {
      return "";
    },
  },
});


export const setNotification = (message, time) => {
  return async (dispatch) => {
    dispatch(addNotification(message));
    setTimeout(() => {
      dispatch(clearNotification());
    }, time * 1000);
  }
}

export const selectNotification = (state) => state.notifications;

export const { addNotification, clearNotification } =
  notificationsSlice.actions;
export default notificationsSlice.reducer;
