import { useMutation, useQueryClient } from "@tanstack/react-query";
import anecdoteService from "../services/anecdoteService";
import { useNotificationDispatch } from "../contexts/NotificationContext";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch();

  const createMutation = useMutation({
    mutationFn: anecdoteService.create,
    onSuccess: (newAnecdote) => {
      const existingAnecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(
        ["anecdotes"],
        [...existingAnecdotes, newAnecdote],
      );
      dispatch({
        type: "SET_NOTIFICATION",
        payload: `You created '${newAnecdote.content}'`,
      });

      setTimeout(() => {
        dispatch({ type: "CLEAR_NOTIFICATION" });
      }, 5000);
    },

    onError: () => {
      dispatch({
        type: "SET_NOTIFICATION",
        payload: "too short anecdote, must have length 5 or more characters"
      })

      setTimeout(() => {
        dispatch({ type: "CLEAR_NOTIFICATION" });
      }, 5000);
    }
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    createMutation.mutate(content);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
