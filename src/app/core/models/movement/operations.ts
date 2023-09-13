export class Operation {
  transactionInformation: {
    transactionType: string;
    transactionName: string;
    transactionDate: string;
    transactionProvider: string;
  };
  officeInformation: {
    officeName: string;
    officeId: string;
  };
  amountsWithOperationType: {
    TICKET: string;
    OUTCOME: string;
    INCOME: string;
    CASH: string;
  };
}
