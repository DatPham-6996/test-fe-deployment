import axios, { AxiosRequestConfig } from 'axios';
import { getAuth } from 'firebase/auth';

export const createAxiosWithToken = async (axiosConfig: AxiosRequestConfig) => {
  const authToken = await getAuth().currentUser?.getIdToken();
  const headers = axiosConfig.headers || {};

  return axios.create({
    headers: {
      Authorization: `Bearer ${authToken}`,
      ...headers,
    },
    ...axiosConfig,
  });
};
