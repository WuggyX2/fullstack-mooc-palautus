import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import anecdoteReducer from "./reducers/anecdoteReducer";
import filterReducer from "./reducers/filterReducer";

const rootReducer = combineReducers({
  anecdotes: anecdoteReducer,
  filter: filterReducer,
});

export const setupStore = (preloadedState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};
