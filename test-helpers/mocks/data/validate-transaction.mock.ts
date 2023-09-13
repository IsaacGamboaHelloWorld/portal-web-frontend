// "api/api/two-factor-auth/continue"
export const twoFactorContinue1Mock = {
  action: 'SELECT_CHALLENGE',
  challenges: ['ENHANCED', 'TOTP'],
  challengeResponses: [],
  transactionId: '4b45da7d-5ba2-44c2-a04b-96d53780c5bd',
  url: '/api/two-factor-auth/continue',
  success: true,
  request: {
    originAccount: {
      accountId: '500801488797',
      accountType: 'DEPOSIT_ACCOUNT',
    },
    payment: {
      amount: 259000,
      billerId: '00001506',
      billerName: 'PLANILLA AS APORTES EN LINEA',
      nie: '79104177',
      invoice: '9420495410',
    },
    id: '33210989',
    idType: 'CC',
    customerId: '33210989',
    customerIdType: 'CC',
    deviceId: 'version%3D3%2E4%2E1%2E0%5F1%',
    companyId: 'BANCO_POPULAR',
    ipAddress: '161.69.121.36',
  },
  dateTime: '2021-06-01T16:53:10.907',
};

export const twoFactorContinue2Mock = {
  action: 'CHALLENGE',
  challengeInformation: {
    challenge: 'ENHANCED',
    parameters: { length: 8 },
    resend: { enabled: false, time: 0 },
  },
  challengeResponses: [],
  transactionId: '4b45da7d-5ba2-44c2-a04b-96d53780c5bd',
  url: '/api/two-factor-auth/continue',
  success: true,
  request: {
    transactionId: '4b45da7d-5ba2-44c2-a04b-96d53780c5bd',
    selectedChallenge: 'ENHANCED',
    action: 'SELECT_CHALLENGE',
    id: '33210989',
    idType: 'CC',
    customerId: '33210989',
    customerIdType: 'CC',
    deviceId: 'version%3D3%2E4%2E1%2E0%5F1%26pm',
    companyId: 'BANCO_POPULAR',
    ipAddress: '161.69.121.36',
  },
  dateTime: '2021-06-01T16:53:23.188',
};

export const twoFactorContinue3Mock = {
  action: 'ALLOW',
  challengeResponses: [
    {
      challenge: 'ENHANCED',
      errorMessage: null,
      response: { code: '74390099' },
      success: true,
    },
  ],
  transactionId: '4b45da7d-5ba2-44c2-a04b-96d53780c5bd',
  url: '/api/two-factor-auth/continue',
  success: true,
  request: {
    transactionId: '4b45da7d-5ba2-44c2-a04b-96d53780c5bd',
    challengeResponse: { code: '74390099' },
    id: '33210989',
    idType: 'CC',
    customerId: '33210989',
    customerIdType: 'CC',
    deviceId: 'version%3D3%2E4%2E1%2E0%5F1%26pm%5Ffp',
    companyId: 'BANCO_POPULAR',
    ipAddress: '161.69.121.36',
  },
  dateTime: '2021-06-01T16:53:41.793',
};

export const twoFactorContinue4Mock = {
  action: 'RESPONSE',
  challengeResponses: [
    {
      challenge: 'ENHANCED',
      errorMessage: null,
      response: { code: '74390099' },
      success: true,
    },
  ],
  response: {
    body:
      // tslint:disable-next-line:max-line-length
      '{"approvalId":"0","apiStatus":0,"errorCode":"2940","errorMessage":"Fondos insuficientes","additionalErrorCode":"01","additionalErrorMessage":"AC-OVD01:El monto disponible de la cuenta 500801487829 despuÃ©s de esta entrada es 227,991.57-","success":false,"request":{"id":"33210989","idType":"CC","currentSystemDate":1622584423013,"companyId":"BANCO_POPULAR","ipAddress":"161.69.121.36","deviceId":"version%3D3%2E4%2E1%2E0%5F1%26pm%5Ffpua%3Dmozilla%2F5%2E0%20%28macintosh%3B%20intel%20mac%20os%20x%2010%5F14%5F6%29%20applewebkit%2F537%2E36%20%28khtml%2C%20like%20gecko%29%20chrome%2F90%2E0%2E4430%2E212%20safari%2F537%2E36%20opr%2F76%2E0%2E4017%2E137%7C5%2E0%20%28Macintosh%3B%20Intel%20Mac%20OS%20X%2010%5F14%5F6%29%20AppleWebKit%2F537%2E36%20%28KHTML%2C%20like%20Gecko%29%20Chrome%2F90%2E0%2E4430%2E212%20Safari%2F537%2E36%20OPR%2F76%2E0%2E4017%2E137%7CMacIntel%26pm%5Ffpsc%3D24%7C1680%7C1050%7C949%26pm%5Ffpsw%3D%26pm%5Ffptz%3D%2D5%26pm%5Ffpln%3Dlang%3Des%2D419%7Csyslang%3D%7Cuserlang%3D%26pm%5Ffpjv%3D0%26pm%5Ffpco%3D1%26pm%5Ffpasw%3Dinternal%2Dpdf%2Dviewer%7Cmhjfbmdgcfjbbpaeojofohoefgiehjai%7Cenmlgamfkfdemjmlfjeeipglcfpomikn%26pm%5Ffpan%3DNetscape%26pm%5Ffpacn%3DMozilla%26pm%5Ffpol%3Dtrue%26pm%5Ffposp%3D%26pm%5Ffpup%3D%26pm%5Ffpsaw%3D1680%26pm%5Ffpspd%3D24%26pm%5Ffpsbd%3D%26pm%5Ffpsdx%3D%26pm%5Ffpsdy%3D%26pm%5Ffpslx%3D%26pm%5Ffpsly%3D%26pm%5Ffpsfse%3D%26pm%5Ffpsui%3D%26pm%5Fos%3DMac%26pm%5Fbrmjv%3D90%26pm%5Fbr%3DChrome%26pm%5Finpt%3D%26pm%5Fexpt%3D","originAccount":{"accountType":"DEPOSIT_ACCOUNT","accountId":"500801487829","bank":"","bankName":""},"RequestDateTime":"2021-06-01T16:53:43.01346825-05:00","payment":{"amount":259000,"billerName":"PLANILLA AS APORTES EN LINEA","billerId":"00001506","nie":"79104177","invoice":"9420495410"}}}\n',
    headers: {
      // tslint:disable-next-line:object-literal-key-quotes
      Date: ['Tue, 01 Jun 2021 21:53:46 GMT'],
      'Content-Type': ['application/json'],
      // tslint:disable-next-line:object-literal-key-quotes
      Connection: ['keep-alive'],
      'Set-Cookie': [
        // tslint:disable-next-line:max-line-length
        'AWSALB=WZGkXrRENNTq2GoFhU0fWLTdh/8Ot9IYDB0s0hJkJ539OnavTBF/sZRsMZVJg1NMkRSPGs+GmKNNJOclTijwgBLeinUrtosI4oL49nNhYGyeoAq/rNzCBTKtrIMnCYMoY3GrgM44jzbYPMhslXl2EBsav7Tz98KiB9aK75skWPB5pMrSrhnVmDiPTJASaWzdDNPADz2M/ypFiugMPtJ9XrSE4f6HcOhVR9Y5OFJdZVpNHJWQmOzIbv0sR32E361+As+7HX49Uqiy1Rlu2GuItVkHvzZAPFoo2jWUluVpe1NAGCojVAD4XIezoteA4sXQb3PiSh6UuiK75ZhadpBX6YgfsDRewRo57wkkW0YiOae9vvkQmp9++w+zaX+bHdnLYA==; Expires=Tue, 08 Jun 2021 21:53:43 GMT; Path=/',
        // tslint:disable-next-line:max-line-length
        'AWSALBCORS=WZGkXrRENNTq2GoFhU0fWLTdh/8Ot9IYDB0s0hJkJ539OnavTBF/sZRsMZVJg1NMkRSPGs+GmKNNJOclTijwgBLeinUrtosI4oL49nNhYGyeoAq/rNzCBTKtrIMnCYMoY3GrgM44jzbYPMhslXl2EBsav7Tz98KiB9aK75skWPB5pMrSrhnVmDiPTJASaWzdDNPADz2M/ypFiugMPtJ9XrSE4f6HcOhVR9Y5OFJdZVpNHJWQmOzIbv0sR32E361+As+7HX49Uqiy1Rlu2GuItVkHvzZAPFoo2jWUluVpe1NAGCojVAD4XIezoteA4sXQb3PiSh6UuiK75ZhadpBX6YgfsDRewRo57wkkW0YiOae9vvkQmp9++w+zaX+bHdnLYA==; Expires=Tue, 08 Jun 2021 21:53:43 GMT; Path=/; SameSite=None; Secure',
      ],
      'Access-Control-Allow-Origin': ['*'],
      // tslint:disable-next-line:object-literal-key-quotes
      Vary: ['Accept-Encoding'],
    },
    status: 200,
  },
  transactionId: '4b45da7d-5ba2-44c2-a04b-96d53780c5bd',
  url: '/api/two-factor-auth/continue',
  success: true,
  request: {
    transactionId: '4b45da7d-5ba2-44c2-a04b-96d53780c5bd',
    challengeResponse: null,
    id: '33210989',
    idType: 'CC',
    customerId: '33210989',
    customerIdType: 'CC',
    deviceId: 'version%3D3%',
    companyId: 'BANCO_POPULAR',
    ipAddress: '161.69.121.36',
  },
  dateTime: '2021-06-01T16:53:46.298',
};
