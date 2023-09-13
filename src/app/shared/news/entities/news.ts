export interface IPreferencesList {
  newsOnBoarding?: boolean;
  newsOnBoarding1?: boolean;
  firstTimeNewsOnboarding?: boolean;
  firstTimeNewsOnboarding1?: boolean;
  firstTimeDocuments?: boolean;
  menuOptionPayment?: boolean;
  menuOptionPayment1?: boolean;
  opt_documents?: boolean;
  wconother?: boolean;
}

export interface IPrefsRequest {
  preferences: any;
}

export interface IPrefsResponse {
  success: boolean;
  errorMessage?: string;
}

export interface IPrefsLoadResponse {
  preferences: IPreferencesList;
  success: boolean;
  errorMessage?: string;
}
