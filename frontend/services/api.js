import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const addVisitor = (visitorData) => {
  return api.post('/resident/addVisitor', visitorData);
};

export const getVisitors = () => {
  return api.get('/resident/viewVisitors');
};

// Additional API calls for security and admin can be added here

export default api;
