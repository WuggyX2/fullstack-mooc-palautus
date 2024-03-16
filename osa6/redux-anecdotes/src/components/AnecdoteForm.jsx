import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import useNotifications from "../hooks/notificationsHook";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const setNotification = useNotifications();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    if (content.trim()) {
      dispatch(createAnecdote(content));
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
