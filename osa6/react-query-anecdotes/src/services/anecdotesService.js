import axios from "axios";
import { asObject } from "../utils/anecdotesUtil";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const newAnecdotes = asObject(content);
  const response = await axios.post(baseUrl, newAnecdotes);
  return response.data;
};

const addVote = async (id) => {
  const anecdotes = await axios.get(`${baseUrl}/${id}`);
  const anecdoteToChange = anecdotes.data;
  const response = await axios.put(`${baseUrl}/${id}`, {
    ...anecdoteToChange,
    votes: anecdoteToChange.votes + 1,
  });

  console.log("response.data", response.data);

  return response.data;
};

export { getAll, createNew, addVote };
