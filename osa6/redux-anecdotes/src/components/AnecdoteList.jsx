import { useSelector, useDispatch } from "react-redux";
import { createVote, selectOrderedAnectodes } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector(selectOrderedAnectodes);
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(createVote(id));
  };

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
