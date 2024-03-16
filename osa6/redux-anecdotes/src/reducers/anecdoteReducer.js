import { createSlice, createSelector } from "@reduxjs/toolkit";
import { getAll, createNew, addVote } from "../services/anecdotesService";

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
      return state.concat(action.payload);
    },
    setAnecdotes: (state, action) => {
      return action.payload;
    },
  },
});

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdoteData = await createNew(content);
    dispatch(newAnecdote(newAnecdoteData));
  };
};

export const voteAnecdote = (id) => {
  return async (dispatch) => {
    await addVote(id);
    dispatch(vote(id));
  };
}

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
