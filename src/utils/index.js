import axios from 'axios';

const tmdbToken = import.meta.env.VITE_TMDB_JWT;

export const movieApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${tmdbToken}`,
  },
});

export const fetchToken = async () => {
  try {
    const { data } = await movieApi.get('/authentication/token/new');

    const token = data.request_token;

    if (data.success) {
      localStorage.setItem('request_token', token);

      window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=${window.location.origin}/approved`;
    }
  } catch (err) {
    console.log(err);
    console.log('token could not be created');
  }
};

export const createSessionId = async () => {
  const token = localStorage.getItem('request_token');

  if (token) {
    try {
      const {
        data: { session_id },
      } = await movieApi.post('/authentication/session/new', {
        request_token: token,
      });

      localStorage.setItem('session_id', session_id);

      return session_id;
    } catch (err) {
      console.log(err);
    }
  }
};
