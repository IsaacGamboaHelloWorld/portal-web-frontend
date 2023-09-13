import { IPdfdata } from '@app/core/interfaces/statement/pdfdata';
import { IStatement } from '@app/core/interfaces/statement/statement';
import { Product } from '@app/core/models/products/product';
import { IincomeRac } from './tributary';

export interface DocumentsState {
  extracts: IPdfdata;
  certificate: ICertificate;
  tributary: ITributary;
  tributaryIncome: IincomeTax;
  tributaryIncomeTaxTC: IincomeTaxTC;
  tributaryRac: IincomeRac;
  product: Product[];
  periods: IStatement;
}

export interface ICertificate {
  errorMessage: string;
  fileUrl: string;
  base64: string;
  name: string;
  success: boolean;
}

export interface IExtracts {
  errorMessage: string;
  fileUrl: string;
  base64: string;
  name: string;
  success: boolean;
}

export interface ITributary {
  errorMessage: string;
  fileUrl: string;
  base64: string;
  name: string;
  success: boolean;
}

export interface IincomeTax {
  errorMessage: string;
  fileUrl: string;
  base64: string;
  name: string;
  success: boolean;
}
export interface IincomeTaxTC {
  errorMessage?: string;
  fileUrl?: string;
  base64?: string;
  name?: string;
  success?: boolean;
  documentResponse?: Array<[]>;
  approvalId?: string;
  dateTime?: string;
  specificErrorMessage?: string;
}
