import axios from "axios";

const URL = "http://localhost:3001/anecdotes";
const getId = () => (100000 * Math.random()).toFixed(0);

const getAll = async () => {
  const response = await axios.get(URL);
  return response.data;
};

const vote = async (anecdoteId) => {
  const existingAnecdote = await axios.get(`${URL}/${anecdoteId}`);

  const response = await axios.patch(`${URL}/${anecdoteId}`, {
    votes: existingAnecdote.data.votes + 1,
  });

  return response.data;
};

const create = async (anecdoteContent) => {
  const response = await axios.post(URL, {
    content: anecdoteContent,
    id: getId(),
    votes: 0,
  });
  return response.data;
};

export default { getAll, vote, create };
