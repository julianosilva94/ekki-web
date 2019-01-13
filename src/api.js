import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

const headers = {
  'Content-Type': 'application/json',
  'Authorization': localStorage.userJWT, 
}

export default {
  user: {
    login: (credentials) => 
      axios.post(`${BASE_URL}/auth/login`, credentials).then(res => res.data.user),

    register: (credentials) => 
      axios.post(`${BASE_URL}/auth/register`, credentials).then(res => res.data.user),

    getData: () =>
      axios.get(`${BASE_URL}/user`, { headers: headers }).then(res => res.data.user),
  },

  transfers: {
    getAll: () =>
      axios.get(`${BASE_URL}/transfers`, { headers: headers })
        .then(res => res.data.transfers),

    create: (values) =>
      axios.post(`${BASE_URL}/transfers`, values, { headers: headers }),
  },

  contacts: {
    getAll: () =>
      axios.get(`${BASE_URL}/user/contacts`, { headers: headers })
        .then(res => res.data.contacts),

    add: (values) =>
      axios.post(`${BASE_URL}/user/contacts`, values, { headers: headers }),

    remove: (id) =>
      axios.delete(`${BASE_URL}/user/contacts/${id}`, { headers: headers }),
  },

  creditCards: {
    getAll: () =>
      axios.get(`${BASE_URL}/credit-cards`, { headers: headers })
        .then(res => res.data.creditCards),

    add: (values) =>
      axios.post(`${BASE_URL}/credit-cards`, values, { headers: headers }),

    remove: (id) =>
      axios.delete(`${BASE_URL}/credit-cards/${id}`, { headers: headers }),
  },
}