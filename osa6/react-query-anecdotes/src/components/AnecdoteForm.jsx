import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationsReducer";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNew } from "../services/anecdotesService";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const newAnecdoteMutation = useMutation({
    mutationFn: createNew,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote));
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    if (content.trim()) {
      newAnecdoteMutation.mutate(content);
      dispatch(setNotification(`You created '${content}'`, 5));
      event.target.anecdote.value = "";
    }
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="anecdote" type="text" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
