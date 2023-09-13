// /experian/otp-evidente-master-flow
export const getQuestionSuccess = {
  additionalErrorMessage: '',
  dateTime: '2022-04-07T10:05:55.915',
  isValidNumber: false,
  request: {
    lastName: 'Villanueva',
    companyId: 'BANCO_POPULAR',
    names: 'Nohemy',
    idType: 'CC',
    customerId:
      'e5f0c1db412a34d9d26c7a9f9bd1916fcb194a666d92ed610cd6ce039bd7b38a',
    ipAddress: '3.13.132.40',
    id: 'e5f0c1db412a34d9d26c7a9f9bd1916fcb194a666d92ed610cd6ce039bd7b38a',
    customerIdType: 'CC',
    otpPhoneNumber: '3212528546',
    deviceId: '*************************t%3D',
    documentExpeditionDate: '2011-06-03 00:00:00.0',
  },
  questionnaire: {
    questions: [
      {
        question: 'EN MARZO DE 2020 SU CREDITO',
        idQuestion: '1',
        answers: [
          { idAnswer: '001', description: 'ESTABA ABIERTO/VIGENTE' },
          {
            idAnswer: '002',
            description: 'ESTABA CANCELADA/SALDADA/CERRADA/INACTIVA',
          },
          {
            idAnswer: '003',
            description:
              'NUNCA HE TENIDO CREDITO DE COMERCIALIZADORAS CON LA ENTIDAD',
          },
        ],
      },
      {
        question:
          'SU CUENTA DE AHORRO CON BANCO HA TENIDO ALGUNA VEZ PROBLEMAS COMO EMBARGOS O CANCELACIONES POR MAL MANEJO?',
        idQuestion: '2',
        answers: [
          { idAnswer: '001', description: 'SI' },
          { idAnswer: '002', description: 'NO' },
          {
            idAnswer: '003',
            description: 'NUNCA HE TENIDO CUENTA DE AHORRO CON LA ENTIDAD',
          },
        ],
      },
      {
        question: 'ALGUNA VEZ USTED HA REGISTRADO ALERTAS EN DATACREDITO?',
        idQuestion: '3',
        answers: [
          { idAnswer: '001', description: 'SI' },
          { idAnswer: '002', description: 'NO' },
        ],
      },
      {
        question: 'EL MONTO PRESTADO POR BANCO ESTABA ENTRE:',
        idQuestion: '4',
        answers: [
          { idAnswer: '001', description: '$35,647,001 Y $59,412,000' },
          { idAnswer: '002', description: '$59,412,001 Y $83,177,000' },
          { idAnswer: '003', description: '$83,177,001 Y $106,942,000' },
          { idAnswer: '004', description: '$106,942,001 Y $130,707,000' },
          { idAnswer: '005', description: '$130,707,001 Y $154,472,000' },
          {
            idAnswer: '006',
            description: 'NO TENGO CREDITO CON LA ENTIDAD',
          },
        ],
      },
    ],
    id: '40aa8e44668515c3500f8de93be53cca127730bed040204cd45762302de58676',
  },
  idTransactionOtp: 'b29e8f5c-7832-4db4-9502-7114613b988f',
  idValidationRecord: '4539780',
  errorMessage: '',
  errorCode: '01',
  success: true,
  step: 'FILL_QUESTIONNAIRE',
  additionalErrorCode: '',
  requiresQuestionnaire: false,
};
