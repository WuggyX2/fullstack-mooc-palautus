import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectOrderedFilteredAnecdotes,
  initializeAnecdotes,
  voteAnecdote,
} from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationsReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector(selectOrderedFilteredAnecdotes);
  const dispatch = useDispatch();

  const handleVote = (id) => {
    dispatch(voteAnecdote(id));
    const anecdoteText = anecdotes.find(
      (anecdote) => anecdote.id === id,
    ).content;
    dispatch(setNotification(`You voted for '${anecdoteText}'`, 5))
  };

  useEffect(() => {
    dispatch(initializeAnecdotes())
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
