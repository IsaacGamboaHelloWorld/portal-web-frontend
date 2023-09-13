import { IPdfdata } from '@app/core/interfaces/statement/pdfdata';
import { IStatementDs } from '@app/core/interfaces/statement/statement';
import { Product } from '@app/core/models/products/product';
import { IincomeTaxTC } from '@app/modules/documents/entities/documents';
import { ICertificate } from '../../entities/certificate';
import { IExtracts } from '../../entities/extracts';
import { ITributaryGmf, ITributaryRetention } from '../../entities/tribubtary';

export const NewDocumentsFeatureName = 'NewDocumentsModuleState';
export const ProdsFeatureName = 'models';

export type ProductsNewState = Readonly<{
  product: Product[];
}>;

export interface DocumentsState {
  product: Product[];
  extracts: IPdfdata;
  certificate: ICertificateState;
  tributaryGmf: ITributaryGmfState;
  tributaryRetention: ITributaryRetentionState;
  tributaryIncomeTaxTC: IIncomeTaxTCState;
  periods: IStatmentState;
}

export interface IStatmentState extends IStatementDs {
  success: boolean;
  loading: boolean;
  loaded: boolean;
  errorMessage: string;
}

export interface ICertificateState extends ICertificate {
  errorMessage: string;
  success: boolean;
  loading: boolean;
  loaded: boolean;
}

export interface IExtractsState extends IExtracts {
  errorMessage: string;
  success: boolean;
  loading: boolean;
  loaded: boolean;
}

export interface ITributaryGmfState extends ITributaryGmf {
  errorMessage: string;
  success: boolean;
  loading: boolean;
  loaded: boolean;
}

export interface ITributaryRetentionState extends ITributaryRetention {
  errorMessage: string;
  success: boolean;
  loading: boolean;
  loaded: boolean;
}

export interface IIncomeTaxTCState extends IincomeTaxTC {
  errorMessage: string;
  success: boolean;
  loading: boolean;
  loaded: boolean;
}
