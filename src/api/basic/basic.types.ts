export interface BasicData {
  id: number;
  createdAt: string;
  updatedAt: string;
  companyName: string;
  ceo: string;
  businessNumber: string;
  mailOrderSaleNumber: string;
  address: string;
  tel: string;
  email: string;
}

export interface GetBasicDetailResponse {
  data: {
    content: BasicData;
  };
}

export interface PatchBasicRequest {
  companyName: string;
  ceo: string;
  businessNumber: string;
  mailOrderSaleNumber: string;
  address: string;
  tel: string;
  email: string;
}

export interface PatchBasicResponse {
  data: {
    content: {
      id: number;
    };
  };
}
