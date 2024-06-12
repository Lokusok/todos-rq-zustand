import axios from 'axios';

const BASE_URL = 'http://localhost:5000/todos';

export const STORAGE_KEY = 'STATE';

export const todosClient = axios.create({
  baseURL: BASE_URL,
});
