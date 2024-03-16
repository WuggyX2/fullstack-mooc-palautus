import { useDispatch } from "react-redux";
import { newAnecdote } from "../reducers/anecdoteReducer";
import useNotifications from "../hooks/notificationsHook";
import { createNew } from "../services/anecdotesService";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const setNotification = useNotifications();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    if (content.trim()) {
      const newAnecdoteObj = await createNew(content);
      dispatch(newAnecdote(newAnecdoteObj));
      setNotification(`You created '${content}'`);
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
