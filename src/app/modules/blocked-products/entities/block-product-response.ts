import { IBlockProduct } from './block-product';

export class BlockProductStateData {
  data: IBlockProductResponse;
  request: IBlockProduct;
  error: boolean;
  loading: boolean;
  loaded: boolean;
  success: boolean;
  specificErrorCode?: string;
  specificErrorMessage?: string;
}

export interface IBlockProductResponse {
  success: boolean;
  errorMessage: string;
  specificErrorMessage?: string;
  specificErrorCode?: string;
}
