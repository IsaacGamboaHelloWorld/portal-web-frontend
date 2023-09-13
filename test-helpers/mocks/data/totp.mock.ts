// api/totp/generate
export const totpGenerateMock = {
  dateTime: '2021-10-07T11:35:50.510',
  qr:
    // tslint:disable-next-line:max-line-length
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAV4AAAFeAQAAAADlUEq3AAADHElEQVR4Xu2YO3bjMAxF4ZMipZegpWhp0tK0FC8hpQsfY3AfqAlt0U6mHqAILfKSxQt+pPnv7WbPM2+s4N4K7q3g3gru7f+A7ya7f1zPl9lPN7Nps1MsxFdMavGj4CHML1/99vllszNMTARsy8mv5x0peACHlnPAITDMNXReJP7shvj8Dwp+B3s6pYXcZlLdFvltwT/BN4voXiOs8dTYs7towW/g+OOh85XEGL559m2J/HhukztS8BE2mbxxXg+DFgsews1wyhA4P1YF+byKalbwAW7zFJOU9GtiD6XFjuW44Ifo1sTpFqmQPRgD+dHyIFrCggew0cKsKelKRow9tNGmqty2FjyAneVoWijAEc8mWGEdLkpp2ZYuMRbcw3ijjKZF3qh4xkVPCvLl20UL7mFVXluQ27OFiYbGcdGEsYfEWHAPRwSblCXIWU2d95B/rikFJyxDYD0ScMXVCcxmL9hfPQru4bxsKAdeWgHOYhL5Ebmn1hkWPIA/mQhJafssawqqG28Fyo8Fj+HWOHu+UKXO5Edj0DpyFzyCWxWJPZNHKkxl0Xl2iV/wezhqilw0byDkR3TWu6iCvOCXMJJqT0uMIffU1eiChzDzG1WEAWVjRp7anq2iQSx4CMv/ouQqnldXflwbhcPS5RQ8hlWOLZVduvwoF+UrreAhbLwVqBe8q+0zLNqb7Ay7xFjwU5nIYqILb1LGs5XRTRux/n3hLbiHs5h4611Uh+PLVWEyunVkwUe4xbP/9UbCWpRKy2NiLPipTPC7C2ub98TIoGxZ8CsYb4yfMTw+VDFMFOeCx3CkQtdNd2pPBiwp1tsJDAUPYb1QpbLSObo/BN40YbqIFDyAm+WexanKTmJEZ3zzohMKHsC4qElLXFQNje/RzR0uXFSnFXyEEdGZUHQrTWZY6110HwoewVcKMHIDa2vLiPTPYYumCn4J63UA02WDra3Q6KGq4NewK6y9ZUSn+8s6HHIfXLTgBrOUOrPM4NxH2BM3kAtvfAUPYfmlXgcmHglCZ76QmxMIeU4r+Aj/1grureDeCu6t4N4K7u3f4D8r4a+sqJHaoQAAAABJRU5ErkJggg==',
  request: {
    companyId: 'BANCO_POPULAR',
    idType: 'CC',
    customerId: '19198659',
    ipAddress: '3.13.132.40',
    id: '19198659',
    customerIdType: 'CC',
    deviceId: 'versionexpt%3D',
  },
  specificErrorMessage: null,
  success: true,
  errorMessage: null,
  errorStatusCode: null,
  approvalId: null,
  id: '4ffbe98d-c7f2-4892-87ab-8a2b7c19249c',
  secret: 'YQOAJ2GMZXLIIXJ6NXJR2FQGSKR5KOLR',
};

// api/totp/register
export const totpRegisterMock = {
  dateTime: '2021-10-07T11:39:06.005',
  request: {
    companyId: 'BANCO_POPULAR',
    code: '293681',
    idType: 'CC',
    totpId: '4ffbe98d-c7f2-4892-87ab-8a2b7c19249c',
    name: 'JMC-CC19198659',
    customerId: '19198659',
    ipAddress: '3.13.132.40',
    id: '19198659',
    customerIdType: 'CC',
    deviceId: 'versionexpt%3D',
  },
  specificErrorMessage: null,
  success: true,
  errorMessage: null,
  errorStatusCode: null,
  approvalId: null,
};

// api/totp/validate
export const totpValidateMock = {
  dateTime: '2021-10-07T11:44:47.754',
  request: {
    companyId: 'BANCO_POPULAR',
    code: '295849',
    idType: 'CC',
    customerId: '19198659',
    ipAddress: '3.13.132.40',
    id: '19198659',
    customerIdType: 'CC',
    deviceId: 'versionexpt%3D',
  },
  specificErrorMessage: null,
  success: true,
  errorMessage: null,
  errorStatusCode: null,
  approvalId: null,
};

// api/totp/devices
export const totpDevicesMock = {
  dateTime: '2021-10-07T11:46:56.947',
  request: {
    companyId: 'BANCO_POPULAR',
    inactive: 'true',
    idType: 'CC',
    invalid: 'true',
    customerId: '19198659',
    ipAddress: '3.13.132.40',
    id: '19198659',
    customerIdType: 'CC',
    deviceId: 'versionexpt%3D',
  },
  specificErrorMessage: null,
  period: 30,
  devices: [
    {
      valid: true,
      name: 'JMC-CC19198659',
      active: true,
      id: '4ffbe98d-c7f2-4892-87ab-8a2b7c19249c',
      secret: 'YQOAJ2GMZXLIIXJ6NXJR2FQGSKR5KOLR',
    },
  ],
  success: true,
  errorMessage: null,
  length: 6,
  errorStatusCode: null,
  approvalId: null,
  algorithm: 'SHA1',
};
