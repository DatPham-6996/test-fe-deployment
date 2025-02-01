import { AxiosResponse } from 'axios';
import { spotfifyAgent } from './agents/spotify-agent';

type SpotifyResponse<T> = {
  code: number;
  message: string;
  data: T[];
};

type ArtistResponse = {
  external_urls: {
    spotify: string;
  };
  followers: {
    href: null | string;
    total: number;
  };
  genres: string[];
  href: string;
  id: string;
  images: {
    url: string;
    height: number;
    width: number;
  }[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
};

export const getArtist = async (): Promise<SpotifyResponse<ArtistResponse>> => {
  const res: AxiosResponse = await spotfifyAgent.get('/shiip/public-api/master-data/province');

  return res.data;
};
