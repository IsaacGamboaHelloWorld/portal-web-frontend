export enum NavigateDocumentsDs {
  home = '/documentos-ds',
  extracts = '/documentos-ds/extractos',
  certificate = '/documentos-ds/certificados-productos',
  tributary = '/documentos-ds/certificados-tributarios',
}

export interface INavigateDocumentsDs {
  home: string;
  extracts: string;
  certificate: string;
  tributary: string;
}
