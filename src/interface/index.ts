// export interface StoreType {
//   tel_no: string;
//   cob_code_nm?: string | null;
//   bizcnd_code_nm?: string | null;
//   upso_nm?: string | null;
//   x_cnts?: string | null;
//   y_dnts?: string | null;
//   rdn_code_nm?: string | null;
//   crtfc_gbn_nm?: string | null;
// }

export interface StoreType {
  id: number;
  phone?: string | null;
  address?: string | null;
  lat?: string | null;
  lng?: string | null;
  name?: string | null;
  category?: string | null;
  storeType?: string | null;
  foodCertifyName?: string | null;
}

export interface StoreApiResonpse {
  data: StoreType[];
  totalPage?: number;
  totalCount?: number;
  page?: number;
}
