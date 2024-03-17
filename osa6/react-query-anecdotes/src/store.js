import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import anecdoteReducer from "./reducers/anecdoteReducer";
import filterReducer from "./reducers/filterReducer";
import notificationsReducer from "./reducers/notificationsReducer";

const rootReducer = combineReducers({
  anecdotes: anecdoteReducer,
  filter: filterReducer,
  notifications: notificationsReducer,
});

export const setupStore = (preloadedState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};
