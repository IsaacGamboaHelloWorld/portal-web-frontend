import * as npm from '@root/package.json';

// /api/pse/private/init
export const initPseSuccessMock = {
  data: {
    approvalId: '2322336',
    errorMessage: '',
    specificErrorMessage: '',
    token: 'a3fe40b8a2f20e6d8732db3402c3a458efbe3b9d96255a645377a08c3879ce16',
    paymentId: '3276303928',
    pseUrlRedirect:
      // tslint:disable-next-line:max-line-length
      'https://registro.desarrollo.pse.com.co/PSEUserRegister/StartTransaction.htm?enc&#x3D;tnPcJHMKlSnmRpHM8fAbu6hYWvJ6WAmOuWqU1HxUhcI062sES3mFwElgAYfQtQV9',
    success: true,
    request: {
      paymentData: {
        commerceCode: 'O0304',
        productType: 'FREE_DESTINATION',
        productId: '1501304718',
        amount: '10000',
        bank: {
          bankId: '1052',
          bankName: 'BANCO COMERCIAL AVVILLAS S.A.',
        },
        paymentType: '3',
        firstName: 'Pepe',
        lastName: 'Algun Apellido',
        description: 'Alguna descripcion',
        emailAddress: 'jhon.marroquin@avaldigitallabs.com',
        legalUserType: '1',
        invoice: '123490000154718',
      },
      id: '19122111',
      idType: 'CC',
      customerId: '19122111',
      customerIdType: 'CC',
      deviceId:
        // tslint:disable-next-line:max-line-length
        'version%3D3%2E4%2E1%2E0%5F1%26pm%5Ffpua%3Dmozilla%2F5%2E0%20%28macintosh%3B%20intel%20mac%20os%20x%2010%5F14%5F6%29%20applewebkit%2F537%2E36%20%28khtml%2C%20like%20gecko%29%20chrome%2F92%2E0%2E4515%2E159%20safari%2F537%2E36%7C5%2E0%20%28Macintosh%3B%20Intel%20Mac%20OS%20X%2010%5F14%5F6%29%20AppleWebKit%2F537%2E36%20%28KHTML%2C%20like%20Gecko%29%20Chrome%2F92%2E0%2E4515%2E159%20Safari%2F537%2E36%7CMacIntel%26pm%5Ffpsc%3D24%7C1680%7C1050%7C1050%26pm%5Ffpsw%3D%26pm%5Ffptz%3D%2D5%26pm%5Ffpln%3Dlang%3Des%2D419%7Csyslang%3D%7Cuserlang%3D%26pm%5Ffpjv%3D0%26pm%5Ffpco%3D1%26pm%5Ffpasw%3Dinternal%2Dpdf%2Dviewer%7Cmhjfbmdgcfjbbpaeojofohoefgiehjai%7Cinternal%2Dnacl%2Dplugin%26pm%5Ffpan%3DNetscape%26pm%5Ffpacn%3DMozilla%26pm%5Ffpol%3Dtrue%26pm%5Ffposp%3D%26pm%5Ffpup%3D%26pm%5Ffpsaw%3D1680%26pm%5Ffpspd%3D24%26pm%5Ffpsbd%3D%26pm%5Ffpsdx%3D%26pm%5Ffpsdy%3D%26pm%5Ffpslx%3D%26pm%5Ffpsly%3D%26pm%5Ffpsfse%3D%26pm%5Ffpsui%3D%26pm%5Fos%3DMac%26pm%5Fbrmjv%3D92%26pm%5Fbr%3DChrome%26pm%5Finpt%3D%26pm%5Fexpt%3D',
      companyId: 'BANCO_POPULAR',
      ipAddress: '3.13.132.40',
    },
    dateTime: '2021-08-27T18:27:20.677',
  },
  success: true,
  errorMessage: null,
  loaded: true,
  loading: false,
};

// /api/pse/private/banks
export const banksPseSuccessMock = {
  approvalId: null,
  errorMessage: null,
  specificErrorMessage: null,
  banks: [
    {
      bankName: 'A continuación seleccione su banco',
      bankId: '0',
    },
    {
      bankName: 'BAN.CO',
      bankId: '1552',
    },
    {
      bankName: 'BANCAMIA',
      bankId: '1059',
    },
    {
      bankName: 'BANCO AGRARIO',
      bankId: '1040',
    },
    {
      bankName: 'BANCO AGRARIO DESARROLLO',
      bankId: '1081',
    },
    {
      bankName: 'BANCO AGRARIO QA DEFECTOS',
      bankId: '1080',
    },
    {
      bankName: 'BANCO CAJA SOCIAL',
      bankId: '10322',
    },
    {
      bankName: 'BANCO CAJA SOCIAL DESARROLLO',
      bankId: '1032',
    },
    {
      bankName: 'BANCO COMERCIAL AVVILLAS S.A.',
      bankId: '1052',
    },
    {
      bankName: 'BANCO COOMEVA S.A. - BANCOOMEVA',
      bankId: '1061',
    },
    {
      bankName: 'BANCO COOPERATIVO COOPCENTRAL',
      bankId: '1066',
    },
    {
      bankName: 'BANCO DAVIVIENDA',
      bankId: '1051',
    },
    {
      bankName: 'BANCO DAVIVIENDA Desarrollo',
      bankId: '10512',
    },
    {
      bankName: 'BANCO DE BOGOTA',
      bankId: '1039',
    },
    {
      bankName: 'BANCO DE BOGOTA DESARROLLO 2013',
      bankId: '1001',
    },
    {
      bankName: 'BANCO DE OCCIDENTE',
      bankId: '1023',
    },
    {
      bankName: 'BANCO FALABELLA',
      bankId: '1062',
    },
    {
      bankName: 'BANCO GNB COLOMBIA (ANTES HSBC)',
      bankId: '1010',
    },
    {
      bankName: 'BANCO GNB SUDAMERIS',
      bankId: '1012',
    },
    {
      bankName: 'BANCO PICHINCHA S.A.',
      bankId: '1060',
    },
    {
      bankName: 'BANCO PROCREDIT COLOMBIA',
      bankId: '1058',
    },
    {
      bankName: 'BANCO PRODUCTOS POR SEPARADO',
      bankId: '1203',
    },
    {
      bankName: 'Banco PSE',
      bankId: '1101',
    },
    {
      bankName: 'BANCO SANTANDER COLOMBIA',
      bankId: '1065',
    },
    {
      bankName: 'BANCO SERFINANSA',
      bankId: '1069',
    },
    {
      bankName: 'BANCO TEQUENDAMA',
      bankId: '1035',
    },
    {
      bankName: 'Banco union Colombia Credito',
      bankId: '1004',
    },
    {
      bankName: 'BANCO UNION COLOMBIANO',
      bankId: '1022',
    },
    {
      bankName: 'BANCO UNION COLOMBIANO FD2',
      bankId: '1005',
    },
    {
      bankName: 'Banco Web Service ACH',
      bankId: '1055',
    },
    {
      bankName: 'Banco Web Service ACH WSE 3.0',
      bankId: '1055',
    },
    {
      bankName: 'BANCOLOMBIA DATAPOWER',
      bankId: '10072',
    },
    {
      bankName: 'BANCOLOMBIA DESARROLLO',
      bankId: '10071',
    },
    {
      bankName: 'BANCOLOMBIA QA',
      bankId: '1007',
    },
    {
      bankName: 'BBVA COLOMBIA S.A.',
      bankId: '1013',
    },
    {
      bankName: 'CITIBANK COLOMBIA S.A.',
      bankId: '1009',
    },
    {
      bankName: 'COLTEFINANCIERA S.A.',
      bankId: '1370',
    },
    {
      bankName: 'CONFIAR COOPERATIVA FINANCIERA',
      bankId: '1292',
    },
    {
      bankName: 'COOPERATIVA FINANCIERA COTRAFA',
      bankId: '1289',
    },
    {
      bankName: 'COOPERATIVA FINANCIERA DE ANTIOQUIA',
      bankId: '1283',
    },
    {
      bankName: 'DAVIPLATA',
      bankId: '1551',
    },
    {
      bankName: 'ITAU',
      bankId: '1006',
    },
    {
      bankName: 'NEQUI CERTIFICACION',
      bankId: '1508',
    },
    {
      bankName: 'Prueba Steve',
      bankId: '121212',
    },
    {
      bankName: 'RAPPIPAY',
      bankId: '1151',
    },
    {
      bankName: 'SCOTIABANK COLPATRIA DESARROLLO',
      bankId: '1019',
    },
    {
      bankName: 'SCOTIABANK COLPATRIA UAT',
      bankId: '1078',
    },
  ],
  success: true,
};

// /api/pse/private/status
export const statusPseSuccessMock = {
  approvalId: '121232',
  errorMessage: '',
  specificErrorMessage: '',
  paymentData: {
    currentCommerceCode: 'O0304',
    productType: 'CREDIT',
    productId: '1501304718',
    amount: 10000,
    bank: {
      bankName: 'BANCO COMERCIAL AVVILLAS S.A.',
      bankId: '1052',
    },
    paymentType: '3',
    firstName: 'Raul',
    lastName: 'Algun Apellido',
    description: 'PAGO Alguna descripcion',
    emailAddress: 'raul.buitrago@avaldigitallabs.com',
    legalUserType: null,
    invoice: '877887',
    redirectUrl: `${npm.localhost}/pagos/ob-bancaria/pse/exitoso`,
    status: 'Pendiente',
    statusCode: '1', // 1 -> Pendiente | 4 -> Aprobada | 2 -> Rechazada
  },
  success: true,
};
