/* tslint:disable:max-classes-per-file */
export class CustomerProfile {
  errorMessage: string;
  specificErrorMessage: string;
  code: string;
  success: boolean;
  identificationDetails: CustomerProfileIdentificationDetails;
  educationInfo: CustomerProfileEducationInfo;
  financialInformation: CustomerProfileFinancialInformation;
  employmentData: CustomerProfileEmploymentData;
  personalData: CustomerProfilePersonalData;
  occupationCode: string;
  wellingDescriptionType: string;
  phones?: CustomerProfilePhone[];
  addresses?: CustomerProfileAddress[];
  emails?: CustomerProfileEmail[];
  phone?: CustomerProfilePhone;
  address?: CustomerProfileAddress;
  email?: CustomerProfileEmail;
}
export class CustomerProfileIdentificationDetails {
  expeditionDate: string;
}
export class CustomerProfileEducationInfo {
  educationLevelCode: string;
  degreeReceivedCode: string;
}
export class CustomerProfileFinancialInformation {
  economicActivityCode: string;
  income: any;
  otherIncome: any;
  expenses: any;
  assets: any;
  liabilities: any;
  outcome: any;
  otherOutcome: any;
  totalPatrimony: any;
}
export class CustomerProfileEmploymentData {
  companyId: string;
  companyName: string;
  entryDate: string;
  endDate: string;
  salary: any;
}
export class CustomerProfilePersonalData {
  gender: string;
  birthDate: string;
  cityId: string;
  stateId: string;
  countryId: string;
  maritalStatus: string;
  hobby: string;
  numberOfChildren: any;
  peopleInChargeOf: any;
  customerNames: CustomerProfileName;
}
export class CustomerProfileName {
  firstName: string;
  middleName: string;
  lastName: string;
}

export class CustomerProfileContactType {
  refId?: string;
}

export class CustomerProfileEmail extends CustomerProfileContactType {
  emailType: string;
  emailAddress: string;
}
export class CustomerProfileAddress extends CustomerProfileContactType {
  address: string;
  cityId: string;
  stateId: string;
  postalCode: string;
  countryCode: string;
  addressType: string;
}
export class CustomerProfilePhone extends CustomerProfileContactType {
  phoneType: string;
  phone: string;
  countryCode: string;
  stateId?: string;
  cityId?: string;
}
