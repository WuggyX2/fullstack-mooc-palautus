import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import anecdoteService from "./services/anecdoteService";
import { useNotificationDispatch } from "./contexts/NotificationContext";

const App = () => {
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["anecdotes"],
    queryFn: anecdoteService.getAll,
    refetchOnWindowFocus: false,
  });

  const voteMutation = useMutation({
    mutationFn: anecdoteService.vote,
    onSuccess: (updatedAnecdote) => {
      const existingAnecdotes = queryClient.getQueryData(["anecdotes"]);
      const updatedAnecdotes = existingAnecdotes.map((anecdote) =>
        anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote,
      );
      queryClient.setQueryData(["anecdotes"], updatedAnecdotes);

      dispatch({
        type: "SET_NOTIFICATION",
        payload: `You voted '${updatedAnecdote.content}'`,
      });

      setTimeout(() => {
        dispatch({ type: "CLEAR_NOTIFICATION" });
      }, 5000);
    },
  });

  const handleVote = (anecdote) => {
    voteMutation.mutate(anecdote.id);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Anecdote service not available due to problems in server</div>;
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {data.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
