import axios from 'axios';
const Api = axios.create({
  baseURL: 'https://heroes.globalthings.net',
  headers: {
    accessKey: '394772d23dfb455a9fc5ee31ce8ee53a',
    'Content-Type': 'application/json',
  },
});

export default Api;
