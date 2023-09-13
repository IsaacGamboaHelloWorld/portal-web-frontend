// api/web-authn/authn/init
export const webAuthInitWithoutDataSuccess = {
  dateTime: '2021-12-01T15:22:17.647',
  request: {
    companyId: 'BANCO_POPULAR',
    idType: 'CC',
    usage: 'LOGIN',
    ipAddress: '3.13.132.40',
    id: 'ce67d028d69af3a49bef21950a47b0ae802762bdac11fb410b4612855d29d287',
  },
  success: false,
  errorMessage: 'Usuario no tiene credenciales activas',
};

export const webAuthInitWithDataSuccess = {
  dateTime: '2021-12-01T15:59:06.945',
  request: {
    companyId: 'BANCO_POPULAR',
    idType: 'CC',
    usage: 'LOGIN',
    ipAddress: '3.13.132.40',
    id: 'ce67d028d69af3a49bef21950a47b0ae802762bdac11fb410b4612855d29d287',
  },
  userVerification: 'preferred',
  success: true,
  challenge: 'RYMZv2MDTMaUcj9vR4bQ4A==',
  allowCredentials: [
    {
      active: true,
      id: '37e65c2a78524cf6983e69779f6bb82d243e7d0b26bc8ef0518bc0cc14841daa',
      usages: ['LOGIN'],
      type: 'public-key',
    },
  ],
  timeout: 60000,
};

// api/web-authn/register/init
export const wehAuthRegisterInitSuccess = {
  dateTime: '2021-12-01T15:32:00.158',
  request: {
    companyId: 'BANCO_POPULAR',
    idType: 'CC',
    customerId:
      'ce67d028d69af3a49bef21950a47b0ae802762bdac11fb410b4612855d29d287',
    ipAddress: '3.13.132.40',
    id: 'ce67d028d69af3a49bef21950a47b0ae802762bdac11fb410b4612855d29d287',
    customerIdType: 'CC',
    deviceId: '*************************t%3D',
  },
  attestation: 'direct',
  success: true,
  challenge: 'tVhN8112S3iBq+O7j0pYbw==',
  authenticatorSelection: {
    authenticatorAttachment: 'cross-platform',
    userVerification: 'preferred',
    requireResidentKey: false,
  },
  user: {
    displayName: 'Guillermo5335 Quintero5335 Garzon5335 Gonzalez5335',
    name: 'Guillermo5335 Garzon5335',
    id: '4f4f0c33bbedff58ad1edc98d20cb6a36309647deb3dee5789045c65030ff4f6',
  },
  excludeCredentials: [],
  rp: {
    name: 'Banco Popular',
    id: 'c85a23ff789f46486deefd031457bb42d79a35392348d5973626e3d92e86b4fc',
  },
  timeout: 60000,
  pubKeyCredParams: [
    {
      type: 'public-key',
      alg: -7,
    },
    {
      type: 'public-key',
      alg: -35,
    },
    {
      type: 'public-key',
      alg: -36,
    },
    {
      type: 'public-key',
      alg: -65535,
    },
    {
      type: 'public-key',
      alg: -257,
    },
    {
      type: 'public-key',
      alg: -258,
    },
    {
      type: 'public-key',
      alg: -259,
    },
  ],
};

// api/web-authn/register :: Solicita la huella
export const webAuthRegisterSuccess = {
  dateTime: '2021-12-01T15:32:17.513',
  request: {
    companyId: 'BANCO_POPULAR',
    idType: 'CC',
    customerId:
      'ce67d028d69af3a49bef21950a47b0ae802762bdac11fb410b4612855d29d287',
    ipAddress: '3.13.132.40',
    id: 'ce67d028d69af3a49bef21950a47b0ae802762bdac11fb410b4612855d29d287',
    customerIdType: 'CC',
    deviceId: '*************************t%3D',
    publicKeyCredential: {
      response: {
        clientDataJSON:
          // tslint:disable-next-line:max-line-length
          'eyJ0eXBlIjoid2ViYXV0aG4uY3JlYXRlIiwiY2hhbGxlbmdlIjoidFZoTjgxMTJTM2lCcS1PN2owcFlidyIsIm9yaWdpbiI6Imh0dHBzOi8vcGItZGV2LXBvcHVsYXIuYXZhbGRpZ2l0YWxsYWJzLmNvbSIsImNyb3NzT3JpZ2luIjpmYWxzZSwib3RoZXJfa2V5c19jYW5fYmVfYWRkZWRfaGVyZSI6ImRvIG5vdCBjb21wYXJlIGNsaWVudERhdGFKU09OIGFnYWluc3QgYSB0ZW1wbGF0ZS4gU2VlIGh0dHBzOi8vZ29vLmdsL3lhYlBleCJ9',
        attestationObject:
          // tslint:disable-next-line:max-line-length
          'o2NmbXRmcGFja2VkZ2F0dFN0bXSiY2FsZyZjc2lnWEcwRQIhAPT+vY1anKvKHCOGePyfwASzJBPXnsx+/nOm8q0dzxMdAiBD51GKnVDUyDgiKQNa6s2r10/Ww0dP/JNTbkfQCnt5zGhhdXRoRGF0YVkBAshaI/94n0ZIbe79AxRXu0LXmjU5I0jVlzYm49kuhrT8RWGn29GtzgACNbzGCmSLCyXx8FUDAH4B6M5Js1FFxNmDkb35SoCl9usoIy7Qj+qKfxQO3L49uFxs9Hi45i/fXjIGf9KNkMFktuMauenl6D01cD3eGeQVaTf1acr21s/fjW6jjr/O3SeYff/yxsxbs48CDdHEGz9kdVitR25iZ7W3MzCrcs6epFhyXbu2WXVKSjL0L6ilAQIDJiABIVggZIspfFrGaSliFCFoTtexAuewWXatdfrfR2b3ECNxdEQiWCAfZEyPgDFEd+nRO/tTZiLbYi++LxQ82uP7QstqyVgWGw==',
      },
      rawId:
        // tslint:disable-next-line:max-line-length
        'AejOSbNRRcTZg5G9+UqApfbrKCMu0I/qin8UDty+PbhcbPR4uOYv314yBn/SjZDBZLbjGrnp5eg9NXA93hnkFWk39WnK9tbP341uo46/zt0nmH3/8sbMW7OPAg3RxBs/ZHVYrUduYme1tzMwq3LOnqRYcl27tll1Skoy9C+o',
      id: '690b8bc221e0267157c9bb574f2965a84a19d9dfc8645b86ad63e6b75c0ae237',
      type: 'public-key',
    },
  },
  success: true,
};

// api/web-authn/credentials/update :: recibe nombre del equipo
export const webAuthCredentialsUpdate = {
  dateTime: '2021-12-01T15:32:25.560',
  request: {
    companyId: 'BANCO_POPULAR',
    idType: 'CC',
    name: 'jmc mac',
    customerId:
      'ce67d028d69af3a49bef21950a47b0ae802762bdac11fb410b4612855d29d287',
    ipAddress: '3.13.132.40',
    active: true,
    credentialId:
      // tslint:disable-next-line:max-line-length
      'AejOSbNRRcTZg5G9+UqApfbrKCMu0I/qin8UDty+PbhcbPR4uOYv314yBn/SjZDBZLbjGrnp5eg9NXA93hnkFWk39WnK9tbP341uo46/zt0nmH3/8sbMW7OPAg3RxBs/ZHVYrUduYme1tzMwq3LOnqRYcl27tll1Skoy9C+o',
    usages: ['LOGIN'],
    id: 'ce67d028d69af3a49bef21950a47b0ae802762bdac11fb410b4612855d29d287',
    customerIdType: 'CC',
    deviceId: '*************************t%3D',
  },
  success: true,
};

// api/web-authn/credentials/delete
export const webAuthCredentialsDelete = {
  dateTime: '2021-12-01T15:34:14.203',
  request: {
    companyId: 'BANCO_POPULAR',
    idType: 'CC',
    customerId:
      'ce67d028d69af3a49bef21950a47b0ae802762bdac11fb410b4612855d29d287',
    ipAddress: '3.13.132.40',
    credentialId:
      // tslint:disable-next-line:max-line-length
      'AejOSbNRRcTZg5G9+UqApfbrKCMu0I/qin8UDty+PbhcbPR4uOYv314yBn/SjZDBZLbjGrnp5eg9NXA93hnkFWk39WnK9tbP341uo46/zt0nmH3/8sbMW7OPAg3RxBs/ZHVYrUduYme1tzMwq3LOnqRYcl27tll1Skoy9C+o',
    id: 'ce67d028d69af3a49bef21950a47b0ae802762bdac11fb410b4612855d29d287',
    customerIdType: 'CC',
  },
  success: true,
};
