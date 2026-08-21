import axios from 'axios';

// Change this one value if the Express server is hosted elsewhere.
const api = axios.create({ baseURL: 'http://localhost:3000', timeout: 10000 });
export const unwrap = (response) => response.data?.data ?? response.data;
export default api;
