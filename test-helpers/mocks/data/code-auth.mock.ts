// /api/user-two-factor-auth/get
export const getState2faEnhancedMock = {
  dateTime: '2021-06-21T09:38:52.228',
  request: {
    companyId: 'BANCO_POPULAR',
    idType: 'CC',
    customerId:
      '5b904123b983835d9b0b678e78d3418469757f9198e0fcbaf41d90cbd42f790a',
    ipAddress: '161.69.121.36',
    id: '5b904123b983835d9b0b678e78d3418469757f9198e0fcbaf41d90cbd42f790a',
    customerIdType: 'CC',
    deviceId: '*************************t%3D',
  },
  success: true,
  errorMessage: null,
  errorCode: null,
  secondFactorAuth: 'ENHANCED',
};

export const getState2faHardMock = {
  secondFactorAuth: 'HARD',
  errorCode: null,
  errorMessage: null,
  success: true,
  request: {
    documentType: 'CC',
    documentNumber: '1001817262',
    companyId: 'BANCO_POPULAR',
    ipAddress: '3.13.132.40',
    id: '1093884556',
    idType: 'CC',
    customerId: '1093884556',
    customerIdType: 'CC',
    deviceId: 'versionexpt%3D',
  },
  dateTime: '2021-06-21T09:31:33.057',
};

export const getState2faErrorMock = {
  secondFactorAuth: null,
  errorCode: '0019',
  errorMessage:
    'El usuario no tiene un segundo factor de autenticaciÃ³n configurado.',
  success: false,
  request: {
    id: '1093884556',
    idType: 'CC',
    customerId: '1093884556',
    customerIdType: 'CC',
    deviceId: 'versionexpt%3D',
    companyId: 'BANCO_POPULAR',
    ipAddress: '3.13.132.40',
  },
  dateTime: '2021-06-21T09:32:01.990',
};

// api/api/admin-two-factor-auth/allowed-assign-enhanced-2fa
export const allowedAssign2faMock = {
  enrollmentSecureData: null,
  success: false,
  userAlreadyHasEnhanced: true,
  userAlreadyHasHard: false,
  errorMessage:
    'Tu cÃ³digo de autenticaciÃ³n estÃ¡ asociado al dato seguro ******4183. Si deseas modificarlo dirÃ­gete a una oficina.',
  request: {
    id: '19122111',
    idType: 'CC',
    customerId: '19122111',
    customerIdType: 'CC',
    deviceId: 'version%3D3%2E4%2E1%2E0%',
    companyId: 'BANCO_POPULAR',
    ipAddress: '3.13.132.40',
  },
  dateTime: '2021-06-17T18:06:04.974',
};

export const allowedAssign2faWithoutDataMock = {
  enrollmentSecureData: null,
  success: false,
  userAlreadyHasEnhanced: false,
  userAlreadyHasHard: false,
  errorMessage:
    'No tienes datos seguros registrados. DirÃ­gete a una oficina para hacerlo. ð',
  request: {
    id: '1000805058',
    idType: 'CC',
    customerId: '1000805058',
    customerIdType: 'CC',
    deviceId: 'version%3D3%2E4%2E1%2E0%5F1%26pm%5Ffpua%3D',
    companyId: 'BANCO_POPULAR',
    ipAddress: '161.69.121.36',
  },
  dateTime: '2021-06-18T09:08:58.121',
};

export const allowedAssign2faSuccessMock = {
  enrollmentSecureData: {
    enrollmentSecureData: {
      secretId: 'password',
      secret: null,
      acctId: '4543227323763198',
      acctType: 'D',
      secureDataMessage:
        'Digite el PIN o Clave de su tarjeta debito terminada en ****3198',
      secureDataLength: 4,
    },
    errorMessage: null,
    success: true,
  },
  success: true,
  userAlreadyHasEnhanced: false,
  userAlreadyHasHard: true,
  errorMessage: null,
};

// api/api/auth-manager/enrollment-secure-data/get-security-question
export const getSecurityQuestionDMock = {
  enrollmentSecureData: {
    secretId: 'password',
    secret: null,
    acctId: '4546167323765453',
    acctType: 'D',
    secureDataMessage:
      'Digite el PIN o Clave de su tarjeta debito terminada en ****5453',
    secureDataLength: 4,
  },
  errorMessage: null,
  success: true,
  request: {
    id: '12129852',
    idType: 'CC',
    customerId: '12129852',
    customerIdType: 'CC',
    deviceId: 'version%3D3%2E4%2E1%2E0%5F1%26pm%5',
    companyId: 'BANCO_POPULAR',
    ipAddress: '3.13.132.40',
  },
  dateTime: '2021-06-17T10:32:46.142',
};

export const getSecurityQuestionSdaMock = {
  enrollmentSecureData: {
    secretId: 'product',
    secret: null,
    acctId: '',
    acctType: 'SDA',
    secureDataMessage:
      'Digite los 12 digitos de su cuenta terminada en ****0489',
    secureDataLength: 12,
  },
  errorMessage: null,
  success: true,
  request: {
    id: '19122111',
    idType: 'CC',
    customerId: '19122111',
    customerIdType: 'CC',
    deviceId: 'version%3D3%2E4%2E1%2E0%5F1%26pm%5Ffpua%3D',
    companyId: 'BANCO_POPULAR',
    ipAddress: '3.13.132.40',
  },
  dateTime: '2021-06-17T14:19:01.627',
};

// "api/api/customer/mdm"
export const getSecureMdmMock = {
  approvalId: null,
  errorMessage: null,
  specificErrorMessage: null,
  firstName: 'Guillermo3910',
  middleName: 'Quintero3910',
  lastName: 'Garzon3910',
  secondLastName: 'Gonzalez3910',
  secureEmail: 'correo@correo.com',
  secureTelephone: null,
  fullName: 'Guillermo3910 Quintero3910 Garzon3910 Gonzalez3910',
  shortName: 'Guillermo3910 Garzon3910',
  success: true,
  ComponentID: '1050094',
  PartyAssociation: [
    {
      ComponentID: '1020026',
      PersonInfo: {
        BirthDt: '1977-11-10 00:00:00.0',
        Gender: 'F',
        PostAddr: [
          {
            StartDt: '2020-12-18 09:27:37.173',
            PreferredIndicator: 'N',
            SourceIdentifierType: '1000005',
            AddrType: 'Residencia',
            Addr1: 'CALLE 123 25 45',
            Addr2: 'INT 2 APARTAMENTO 602',
            Addr3: null,
            City: 'Bogota',
            StateProv: '1000011',
            Country: '1000037',
            PostalCode: null,
            Neighborhood: null,
          },
        ],
        ContactInfo: [
          {
            StartDt: '2020-12-18 09:27:37.192',
            PreferredIndicator: 'Y',
            SourceIdentifierType: '1000005',
            UsageType: 'TelÃ©fono residencia',
            ContactValue: '3333000',
            ContactType: 'NÃºmero de telÃ©fono',
            PhoneNum: {
              CountryCode: null,
              Phone: '3333000',
              PhoneExtension: null,
            },
          },
        ],
        GovIssueIdent: [
          {
            GovIssueIdentType: '1000003',
            IdentSerialNum: '12129852',
            StartDt: '2020-12-18 09:27:37.158',
            IssuedLoc: null,
            SourceIdentifierType: '1000005',
            IssDt: null,
            Country: null,
          },
        ],
        PersonName: [
          {
            UsageType: '1',
            FirstName: 'GUILLERMO3910',
            MiddleName: 'QUINTERO3910',
            LastName: 'GARZON3910',
            SecondLastName: 'GONZALEZ3910',
            StartDt: '2020-12-17 00:00:00.0',
            SourceIdentifierType: '1000005',
          },
        ],
        AdminContEquiv: null,
        PartyType: 'P',
      },
    },
  ],
  request: {
    id: '12129852',
    idType: 'CC',
    customerId: '12129852',
    customerIdType: 'CC',
    deviceId: 'version%3D3%2E4%2E1%2E0%5F1%26pm%5Ffpu',
    companyId: 'BANCO_POPULAR',
    ipAddress: '3.13.132.40',
  },
  dateTime: '2021-06-17T10:32:46.172',
};

// "api/api/user-two-factor-auth/get"
export const getUserTwoFactorAuth = {
  secondFactorAuth: 'ENHANCED',
  errorCode: null,
  errorMessage: null,
  success: true,
  request: {
    id: '12129852',
    idType: 'CC',
    customerId: '12129852',
    customerIdType: 'CC',
    deviceId: 'version%3D3%2E4%2E1%2E0%5F1%26pm%5Ffpua%3Dmozilla%',
    companyId: 'BANCO_POPULAR',
    ipAddress: '3.13.132.40',
  },
  dateTime: '2021-06-17T10:32:46.202',
};
