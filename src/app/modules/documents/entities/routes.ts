export enum NavigateDocuments {
  home = '/documentos',
  extracts = '/documentos/extractos',
  certificate = '/documentos/certificados-productos',
  tributary = '/documentos/certificados-tributarios',
}

export interface INavigateDocuments {
  home: string;
  extracts: string;
  certificate: string;
  tributary: string;
}
