import { createSlice, createSelector } from "@reduxjs/toolkit";

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = [];


const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: initialState,
  reducers: {
    vote: (state, action) => {
      return state.map((anecdote) =>
        anecdote.id !== action.payload
          ? anecdote
          : { ...anecdote, votes: anecdote.votes + 1 },
      );
    },
    newAnecdote: (state, action) => {
      return state.concat(asObject(action.payload));
    },
    setAnecdotes: (state, action) => {
      return action.payload;
    },
  },
});

const filter = (state) => state.filter;
const anecdotes = (state) => state.anecdotes;

const selectFilteredAnecdotes = createSelector(
  [filter, anecdotes],
  (filter, anecdotes) => {
    return anecdotes?.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase()),
    );
  },
);

export const selectOrderedFilteredAnecdotes = createSelector(
  [selectFilteredAnecdotes],
  (filteredAnecdotes) => {
    return filteredAnecdotes.sort((a, b) => b.votes - a.votes);
  },
);

export const { vote, newAnecdote, setAnecdotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
