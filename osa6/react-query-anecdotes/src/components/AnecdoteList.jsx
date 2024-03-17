import { useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationsReducer";
import { useQuery } from "@tanstack/react-query";
import { getAll } from "../services/anecdotesService";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const { isPending, isError, data } = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAll,
    refetchOnWindowFocus: false,
  });

  if (isError) {
    return (
      <div>Anecdote server is not available due to problems in the server</div>
    );
  }

  if (isPending) {
    return <div>Loading anecdotes</div>;
  }

  const handleVote = (id) => {
    dispatch(voteAnecdote(id));
    const anecdoteText = data.find((anecdote) => anecdote.id === id).content;
    dispatch(setNotification(`You voted for '${anecdoteText}'`, 5));
  };

  return (
    <>
      {data.map((anecdote) => (
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
