/* tslint:disable:max-classes-per-file */
export class UserSecureDataMdmResponse {
  errorMessage: string;
  success: boolean;
  ComponentID: string;
  PartyAssociation: PartyAssociationElement[];
  shortName?: string;
  fullName?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  secondLastName?: string;
  secureEmail?: string;
  secureTelephone?: string;
  contactPreference?: string;
  documentExpeditionDate?: string;
}

export class PartyAssociationElement {
  ComponentID: string;
  PersonInfo: PersonInfoElement;
}

export class PersonInfoElement {
  BirthDt: string;
  Gender: string;
  PartyType: string;
  PostAddr: PostAddrElement[];
  ContactInfo: ContactInfoElement[];
  PersonName: PersonNameElement[];
}

export class PostAddrElement {
  AddrType: string;
  StartDt: string;
  PreferredIndicator: string;
  SourceIdentifierType: string;
  Addr1: string;
  Addr3: string;
  City: string;
  StateProv: string;
  Country: string;
}

export class ContactInfoElement {
  UsageType: string;
  StartDt: string;
  PreferredIndicator: string;
  SourceIdentifierType: string;
  ContactValue: string;
  ContactType: string;
  PhoneNum: PhoneNumElement;
}

export class PhoneNumElement {
  CountryCode: string;
  Phone: string;
}

export class PersonNameElement {
  UsageType: string;
  FirstName: string;
  LastName: string;
  SecondLastName: string;
}
