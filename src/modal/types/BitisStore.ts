export interface IBitisStore {
  province_code: string;
  district_code: string;
  district: string;
  province: string;
  name: string;
  address: string;
  phone: string;
  opening_hours: string;
  lat?: string;
  lng?: string;
}

export interface IBitisStoreResponse {
  stores: IBitisStore[];
}
