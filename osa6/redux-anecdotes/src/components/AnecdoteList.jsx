import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  vote,
  selectOrderedFilteredAnecdotes,
  setAnecdotes,
} from "../reducers/anecdoteReducer";
import useNotifications from "../hooks/notificationsHook";
import { getAll } from "../services/anecdotesService";

const AnecdoteList = () => {
  const anecdotes = useSelector(selectOrderedFilteredAnecdotes);
  const dispatch = useDispatch();
  const setNotificaton = useNotifications();

  const handleVote = (id) => {
    dispatch(vote(id));
    const anecdoteText = anecdotes.find(
      (anecdote) => anecdote.id === id,
    ).content;

    setNotificaton(`You voted for '${anecdoteText}'`);
  };

  useEffect(() => {
    getAll().then((anecdotes) => {
      dispatch(setAnecdotes(anecdotes));
    });
  }, []);

  if (anecdotes.length === 0) {
    return <div>Loading anecdotes</div>
  }

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
