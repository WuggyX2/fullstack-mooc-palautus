import { useSelector, useDispatch } from "react-redux";
import { vote, selectOrderedFilteredAnecdotes} from "../reducers/anecdoteReducer";
import useNotifications from "../hooks/notificationsHook";

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
