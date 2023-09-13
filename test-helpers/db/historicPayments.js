const historicPaymentsMock = {
  errorMessage: null,
  records: {
    '2019-12-16': [
      {
        paymentType: 'LOAN',
        paymentDate: '2019-12-16',
        approvalId: 12345678,
        paymentStatus: 'ERROR',
        paymentStatusMessage: 'blabla bla',
        destinationEntityName: 'Banco mis ahorros',
        description: 'Alguna nota bla bla bla',
        originAccount: '20302030203',
        originAccountType: 'CURRENT_ACCOUNT',
        amount: 20000,
        loanPaymentData: {
          accountId: 3050305030503050305,
          accountType: 'OTHER_CREDIT',
          nie: null,
          serviceCode: null,
          invoice: null
        },
        creditCardPaymentData: null,
        billerPaymentData: null,
        nonBillerPaymentData: null,
        taxPaymentData: null,
        psePaymentData: null
      },
      {
        paymentType: 'LOAN',
        paymentDate: '2019-12-16',
        approvalId: 12345678,
        paymentStatus: 'PENDING',
        paymentStatusMessage: 'blabla bla',
        destinationEntityName: 'Banco mis ahorros',
        description: 'Alguna nota bla bla bla',
        originAccount: '20302030203',
        originAccountType: 'CURRENT_ACCOUNT',
        amount: 20000,
        loanPaymentData: {
          accountId: "3050305030503050305",
          accountType: 'OTHER_CREDIT'
        },
        creditCardPaymentData: {
          accountId: "3050305030503050305",
          accountType: 'OTHER_CREDIT'
        },
        billerPaymentData: {
          nie: "REFERENCIA DEL PAGO",
          serviceCode: "IDENTIFICADOR DEL CONVENIO (NO ESTA EN EL ZEPLIN)",
          invoice: "NUMERO DE FACTURA"
        },
        nonBillerPaymentData: {
          nie: "REFERENCIA DEL PAGO",
          serviceCode: "IDENTIFICADOR DEL CONVENIO (NO ESTA EN EL ZEPLIN)",
          invoice: "NUMERO DE FACTURA"
        },
        taxPaymentData: {
          nie: "REFERENCIA DEL PAGO",
          serviceCode: "IDENTIFICADOR DEL CONVENIO (NO ESTA EN EL ZEPLIN)",
          invoice: "NUMERO DE FACTURA"
        },
        psePaymentData: {
          nie: "REFERENCIA DEL PAGO",
          serviceCode: "IDENTIFICADOR DEL CONVENIO (NO ESTA EN EL ZEPLIN)",
          invoice: "NUMERO DE FACTURA"
        }
      },
      {
        paymentType: 'LOAN',
        paymentDate: '2019-12-16',
        approvalId: 12345678,
        paymentStatus: 'SUCCESS',
        paymentStatusMessage: 'blabla bla',
        destinationEntityName: 'Banco mis ahorros',
        description: 'Alguna nota bla bla bla',
        originAccount: '20302030203',
        originAccountType: 'CURRENT_ACCOUNT',
        amount: 20000,
        loanPaymentData: {
          accountId: 3050305030503050305,
          accountType: 'OTHER_CREDIT',
          nie: null,
          serviceCode: null,
          invoice: null
        },
        creditCardPaymentData: null,
        billerPaymentData: null,
        nonBillerPaymentData: null,
        taxPaymentData: null,
        psePaymentData: null
      }
    ],
    '2019-12-18': [
      {
        paymentType: 'LOAN',
        paymentDate: '2019-12-16',
        approvalId: 12345678,
        paymentStatus: 'SUCCESS',
        paymentStatusMessage: 'blabla bla',
        destinationEntityName: 'Banco mis ahorros',
        description: 'Alguna nota bla bla bla',
        originAccount: '20302030203',
        originAccountType: 'CURRENT_ACCOUNT',
        amount: 20000,
        loanPaymentData: {
          accountId: 3050305030503050305,
          accountType: 'OTHER_CREDIT',
          nie: null,
          serviceCode: null,
          invoice: null
        },
        creditCardPaymentData: null,
        billerPaymentData: null,
        nonBillerPaymentData: null,
        taxPaymentData: null,
        psePaymentData: null
      },
      {
        paymentType: 'LOAN',
        paymentDate: '2019-12-16',
        approvalId: 12345678,
        paymentStatus: 'SUCCESS',
        paymentStatusMessage: 'blabla bla',
        destinationEntityName: 'Banco mis ahorros',
        description: 'Alguna nota bla bla bla',
        originAccount: '20302030203',
        originAccountType: 'CURRENT_ACCOUNT',
        amount: 20000,
        loanPaymentData: {
          accountId: 3050305030503050305,
          accountType: 'OTHER_CREDIT',
          nie: null,
          serviceCode: null,
          invoice: null
        },
        creditCardPaymentData: null,
        billerPaymentData: null,
        nonBillerPaymentData: null,
        taxPaymentData: null,
        psePaymentData: null
      },
      {
        paymentType: 'LOAN',
        paymentDate: '2019-12-16',
        approvalId: 12345678,
        paymentStatus: 'SUCCESS',
        paymentStatusMessage: 'blabla bla',
        destinationEntityName: 'Banco mis ahorros',
        description: 'Alguna nota bla bla bla',
        originAccount: '20302030203',
        originAccountType: 'CURRENT_ACCOUNT',
        amount: 20000,
        loanPaymentData: {
          accountId: 3050305030503050305,
          accountType: 'OTHER_CREDIT',
          nie: null,
          serviceCode: null,
          invoice: null
        },
        creditCardPaymentData: null,
        billerPaymentData: null,
        nonBillerPaymentData: null,
        taxPaymentData: null,
        psePaymentData: null
      }
    ],
    '2019-12-20': [
      {
        paymentType: 'LOAN',
        paymentDate: '2019-12-16',
        approvalId: 12345678,
        paymentStatus: 'SUCCESS',
        paymentStatusMessage: 'blabla bla',
        destinationEntityName: 'Banco mis ahorros',
        description: 'Alguna nota bla bla bla',
        originAccount: '20302030203',
        originAccountType: 'CURRENT_ACCOUNT',
        amount: 20000,
        loanPaymentData: {
          accountId: 3050305030503050305,
          accountType: 'OTHER_CREDIT',
          nie: null,
          serviceCode: null,
          invoice: null
        },
        creditCardPaymentData: null,
        billerPaymentData: null,
        nonBillerPaymentData: null,
        taxPaymentData: null,
        psePaymentData: null
      },
      {
        paymentType: 'LOAN',
        paymentDate: '2019-12-16',
        approvalId: 12345678,
        paymentStatus: 'SUCCESS',
        paymentStatusMessage: 'blabla bla',
        destinationEntityName: 'Banco mis ahorros',
        description: 'Alguna nota bla bla bla',
        originAccount: '20302030203',
        originAccountType: 'CURRENT_ACCOUNT',
        amount: 20000,
        loanPaymentData: {
          accountId: 3050305030503050305,
          accountType: 'OTHER_CREDIT',
          nie: null,
          serviceCode: null,
          invoice: null
        },
        creditCardPaymentData: null,
        billerPaymentData: null,
        nonBillerPaymentData: null,
        taxPaymentData: null,
        psePaymentData: null
      },
      {
        paymentType: 'LOAN',
        paymentDate: '2019-12-16',
        approvalId: 12345678,
        paymentStatus: 'SUCCESS',
        paymentStatusMessage: 'blabla bla',
        destinationEntityName: 'Banco mis ahorros',
        description: 'Alguna nota bla bla bla',
        originAccount: '20302030203',
        originAccountType: 'CURRENT_ACCOUNT',
        amount: 20000,
        loanPaymentData: {
          accountId: 3050305030503050305,
          accountType: 'OTHER_CREDIT',
          nie: null,
          serviceCode: null,
          invoice: null
        },
        creditCardPaymentData: null,
        billerPaymentData: null,
        nonBillerPaymentData: null,
        taxPaymentData: null,
        psePaymentData: null
      }
    ]
  },
  success: true
};

module.exports = historicPaymentsMock;
