import axios from 'axios';
const api = axios.create({
    baseURL: `https://grizzled-even-sociology.glitch.me/api`,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  export default api;