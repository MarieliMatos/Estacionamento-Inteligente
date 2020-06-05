import axios from 'axios';

const api = axios.create({
  baseURL: 'https://3e7wnwblpi.execute-api.us-east-1.amazonaws.com/production',
});

export default api;
