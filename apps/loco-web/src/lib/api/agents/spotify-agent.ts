import axios from 'axios';

export const spotfifyAgent = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SPOTIFY_PATH,
  headers: {
    Authorization: `Bearer ${process.env.SPOTIFY_TOKEN}`,
  },
});
