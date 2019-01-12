import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export default {
  user: {
    login: (credentials) => 
      axios.post(`${BASE_URL}/auth/login`, credentials).then(res => res.data.user),
  }
}