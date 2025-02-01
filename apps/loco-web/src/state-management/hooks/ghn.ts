import { Province, District, Ward, getProvinces, getDistricts, getWards } from '@/lib/api/ghn';
import { useQuery } from '@tanstack/react-query';

export type LocationData = {
  id: string;
  name: string;
};

export function useCities() {
  const { isLoading, error, data: res } = useQuery({ queryKey: ['get-provinces'], queryFn: getProvinces });

  return {
    isLoading,
    error,
    cities: res?.data.map((province: Province) => ({
      id: province.ProvinceID.toString(),
      name: province.ProvinceName,
    })),
  };
}

export function useGetDistricts(provinceId: number) {
  const {
    isLoading,
    error,
    data: res,
  } = useQuery({
    queryKey: [`get-districts-${provinceId}`],
    queryFn: () => getDistricts(provinceId),
    enabled: !!provinceId,
  });

  return {
    isLoading,
    error,
    districts: res?.data.map((district: District) => ({
      id: district.DistrictID.toString(),
      name: district.DistrictName,
    })),
  };
}

export function useGetWards(districtId: number) {
  const {
    isLoading,
    error,
    data: res,
  } = useQuery({ queryKey: [`get-wards-${districtId}`], queryFn: () => getWards(districtId), enabled: !!districtId });

  return {
    isLoading,
    error,
    wards: res?.data.map((ward: Ward) => ({
      id: ward.WardCode.toString(),
      name: ward.WardName,
    })),
  };
}
