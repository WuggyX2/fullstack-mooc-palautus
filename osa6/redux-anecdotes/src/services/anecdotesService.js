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

export { getAll, createNew };
