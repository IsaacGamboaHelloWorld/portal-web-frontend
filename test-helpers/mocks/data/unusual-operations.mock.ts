// api/unusual-operations-api/query-transactions
export const unusualOperationsQuerySuccess = {
  dateTime: '2022-02-14T15:23:30.254',
  TransactionsByCard: [
    {
      DepAcctTrnRec: [],
      CardNum: '4347615057038951',
    },
    {
      DepAcctTrnRec: [],
      CardNum: '4506589999417093',
    },
    {
      DepAcctTrnRec: [
        {
          CurAmt: {
            CurCode: '',
            Amt: '1',
          },
          CommerceInfo: {
            Name: '0000OPOPULAR IVR CATU',
          },
          Country: 'CO',
          BankAcctTrnRec: {
            TrnType: '00',
            TrnSrc: 'Histórico',
            OrigDt: '2022-02-04T12:18:03.000Z',
          },
          TrnId: '.9$&/5*!$',
        },
      ],
      CardNum: '4544059932896476',
    },
    {
      DepAcctTrnRec: [],
      CardNum: '5361709934167881',
    },
    {
      DepAcctTrnRec: [],
      CardNum: '5475989946540548',
    },
    {
      DepAcctTrnRec: [
        {
          CurAmt: {
            CurCode: '',
            Amt: '*0000',
          },
          CommerceInfo: {
            Name: '0000OPOPULAR IVR CATU',
          },
          Country: 'CO',
          BankAcctTrnRec: {
            TrnType: '51',
            TrnSrc: 'Histórico',
            OrigDt: '2022-02-09T10:41:26.000Z',
          },
          TrnId: ',9$,-L@!!',
        },
        {
          CurAmt: {
            CurCode: '',
            Amt: '*0000',
          },
          CommerceInfo: {
            Name: '0000OPOPULAR IVR CATU',
          },
          Country: 'CO',
          BankAcctTrnRec: {
            TrnType: '51',
            TrnSrc: 'Histórico',
            OrigDt: '2022-02-07T15:43:56.000Z',
          },
          TrnId: '+9$*2N^!!',
        },
        {
          CurAmt: {
            CurCode: '',
            Amt: '*0000',
          },
          CommerceInfo: {
            Name: '0000OPOPULAR IVR CATU',
          },
          Country: 'CO',
          BankAcctTrnRec: {
            TrnType: '51',
            TrnSrc: 'Histórico',
            OrigDt: '2022-02-04T11:12:48.000Z',
          },
          TrnId: '09$&./W!$',
        },
      ],
      CardNum: '5475989953051686',
    },
  ],
  request: {
    companyId: 'BANCO_POPULAR',
    idType: 'CC',
    customerId:
      '5b904123b983835d9b0b678e78d3418469757f9198e0fcbaf41d90cbd42f790a',
    ipAddress: '3.13.132.40',
    id: '5b904123b983835d9b0b678e78d3418469757f9198e0fcbaf41d90cbd42f790a',
    customerIdType: 'CC',
    deviceId: '*************************t%3D',
  },
  specificErrorMessage: '',
  success: true,
  errorMessage: '',
};

// api/unusual-operations-api/approve-reject-transactions
export const unusualOperationAproveSuccess = {
  success: true,
  errorMessage: '',
  specificErrorMessage: '',
  typeOperation: '1',
  AdditionalData: [
    {
      ProductId: '4205599961071558',
      Name: 'Queued',
      Value: '18622523-4306-4DDF-946F-F65952D4E541',
    },
    {
      ProductId: '4205599961071559',
      Name: 'Queued',
      Value: '845651C1-314B-4D1B-8BD9-526F5B0C92C9',
    },
    {
      ProductId: '4205599961071560',
      Name: 'Queued',
      Value: '8D0DCCCC-DDB2-46F6-8447-3320C870863F',
    },
  ],
};
