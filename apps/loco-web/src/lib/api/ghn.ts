import { AxiosResponse } from 'axios';
import { ghnAgent } from './agents/ghn-agent';

type WhiteListClient = {
  From: number[];
  To: number[];
  Return: number[];
};

type WhiteListDistrictWard = {
  From: null;
  To: null;
};

export type Province = {
  CanUpdateCOD: boolean;
  Code: string;
  CountryID: number;
  CreatedAt: string; // Could potentially use Date type if always working with Date objects
  IsEnable: number; // This seems to represent a boolean but is given as a number, consider using boolean if possible
  NameExtension: string[]; // Array of strings
  ProvinceID: number;
  ProvinceName: string;
  RegionCPN: number;
  RegionID: number;
  Status: number; // This seems to represent a boolean but is given as a number, consider using boolean if possible
  UpdatedAt: string; // Could potentially use Date type if always working with Date objects
  UpdatedBy: number;
};

export type District = {
  DistrictID: number;
  ProvinceID: number;
  DistrictName: string;
  Code: string;
  Type: number;
  SupportType: number;
  NameExtension: string[];
  IsEnable: number; // Consider changing to boolean if it represents a boolean value
  UpdatedBy: number;
  CreatedAt: string; // Could potentially use Date type if always working with Date objects
  UpdatedAt: string; // Could potentially use Date type if always working with Date objects
  CanUpdateCOD: boolean;
  Status: number; // Consider changing to boolean if it represents a boolean value
  PickType: number;
  DeliverType: number;
  WhiteListClient: WhiteListClient;
  WhiteListDistrict: WhiteListDistrictWard;
  ReasonCode: string;
  ReasonMessage: string;
  OnDates: null; // Specify more if you know what type it should be
  UpdatedEmployee: number;
  UpdatedDate: string; // Could potentially use Date type if always working with Date objects
};

export type Ward = {
  WardCode: string;
  DistrictID: number;
  WardName: string;
  NameExtension: string[];
  IsEnable: number; // Consider changing to boolean if it represents a boolean value
  CanUpdateCOD: boolean;
  UpdatedBy: number;
  CreatedAt: string; // Could potentially use Date type if working with Date objects
  UpdatedAt: string; // Could potentially use Date type if working with Date objects
  SupportType: number;
  PickType: number;
  DeliverType: number;
  WhiteListClient: WhiteListClient;
  WhiteListWard: WhiteListDistrictWard;
  Status: number; // Consider changing to boolean if it represents a boolean value
  ReasonCode: string;
  ReasonMessage: string;
  OnDates: null; // Specify more if you know what type it should be
  UpdatedEmployee: number;
  UpdatedDate: string; // Could potentially use Date type if working with Date objects
};

type GHNResponse<T> = {
  code: number;
  message: string;
  data: T[];
};

export const getProvinces = async (): Promise<GHNResponse<Province>> => {
  const res: AxiosResponse = await ghnAgent.get('/shiip/public-api/master-data/province');

  return res.data;
};

export const getDistricts = async (provinceId: number): Promise<GHNResponse<District>> => {
  const res: AxiosResponse = await ghnAgent.get(`/shiip/public-api/master-data/district?province_id=${provinceId}`);
  return res.data;
};

export const getWards = async (districtId: number): Promise<GHNResponse<Ward>> => {
  const res: AxiosResponse = await ghnAgent.get(`/shiip/public-api/master-data/ward?district_id=${districtId}`);
  return res.data;
};
