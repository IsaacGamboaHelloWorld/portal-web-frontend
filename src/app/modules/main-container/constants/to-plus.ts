export interface IToPlus {
  success: boolean;
  status: string;
  totalPoints: number;
  points: IProductsToPlus;
}

export interface IProductsToPlus {
  BANCO_DE_BOGOTA: number;
  BANCO_POPULAR: number;
  BANCO_OCCIDENTE: number;
  BANCO_AV_VILLAS: number;
}
