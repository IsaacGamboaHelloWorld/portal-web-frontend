let faker = require('faker');

const pending =  {
    success: true,
    errorMessage: '',
    pendingTransfers: [
        {
            "id": "79303383",
            "idType": "CC",
            "requestId":"200123003030",
            "ipAddress":"192.168.0.1",
            "companyId":"BANCO_POPULAR",
            "notes":"string",
            "dueDate":"2019-01-22T22:35:40.772Z",
            "accountFromInformation": {
                "accountIdentifier": faker.random.number(),
                "productType": "CURRENT_ACCOUNT"
            },
            "accountToInformation": {
                "accountIdentifier": faker.random.number(),
                "productType": "CURRENT_ACCOUNT",
                "bank": "0002",
                "bankName": "Banco popular",
                "identificationType": "CC",
                "identificationNumber": "19800203",
                "isNewAccount": false,
                "name":"Some name bla bla bla"
            },
            "transferInformation": {
                "amount": 10000
            }
        },
        {
            "id": "79303383",
            "idType": "CC",
            "requestId":"200123003030",
            "ipAddress":"192.168.0.1",
            "companyId":"BANCO_POPULAR",
            "notes":"string",
            "dueDate":"2019-01-22T22:35:40.772Z",
            "accountFromInformation": {
                "accountIdentifier": faker.random.number(),
                "productType": "CURRENT_ACCOUNT"
            },
            "accountToInformation": {
                "accountIdentifier": faker.random.number(),
                "productType": "CURRENT_ACCOUNT",
                "bank": "0002",
                "bankName": "Banco popular",
                "identificationType": "CC",
                "identificationNumber": "19800203",
                "isNewAccount": false,
                "name":"Some sdfghewqrwt bla bla bla"
            },
            "transferInformation": {
                "amount": 56745675868
            }
        },
        {
            "id": "79303383",
            "idType": "CC",
            "requestId":"200123003030",
            "ipAddress":"192.168.0.1",
            "companyId":"BANCO_POPULAR",
            "notes":"string",
            "dueDate":"2019-01-22T22:35:40.772Z",
            "accountFromInformation": {
                "accountIdentifier": faker.random.number(),
                "productType": "CURRENT_ACCOUNT"
            },
            "accountToInformation": {
                "accountIdentifier": faker.random.number(),
                "productType": "CURRENT_ACCOUNT",
                "bank": "0002",
                "bankName": "Banco popular",
                "identificationType": "CC",
                "identificationNumber": "19800203",
                "isNewAccount": false,
                "name":"e rethfghdfg bla bla bla"
            },
            "transferInformation": {
                "amount": 3645676575
            }
        }
    ]
};

module.exports = pending;


