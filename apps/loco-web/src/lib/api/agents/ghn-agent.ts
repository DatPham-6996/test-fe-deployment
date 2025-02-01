import axios from 'axios';

export const ghnAgent = axios.create({
  baseURL: process.env.NEXT_PUBLIC_GHN_PATH,
  headers: {
    token: process.env.NEXT_PUBLIC_GHN_TOKEN,
  },
});
