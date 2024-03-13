import { useSelector, useDispatch } from "react-redux";
import { vote, selectOrderedAnectodes } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector(selectOrderedAnectodes);
  const dispatch = useDispatch();

  const handleVote = (id) => {
    dispatch(vote(id));
  };

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
