let faker = require('faker');

const productsMock = {
    DEPOSIT_ACCOUNT: [],
    CREDIT_CARD: []
};


for (let i = 0; i < 3; i++) {
    productsMock.DEPOSIT_ACCOUNT.push(
        {
            "customerInformation": {
                "serviceProviderId": null,
                "customerPermanentId": null,
                "customerLoginId": null
            },
            "depositAccountInformation": {
                "accountIdentifier": faker.random.number(),
                "productType": "DEPOSIT_ACCOUNT",
                "bank": null
            },
            "creditCardAccountInformation": null,
            "loanAccountInformation": null,
            "accountBalance": {
                "amount": faker.random.number(),
                "currencyCode": "COP",
                "description": "Saldo_disponible",
                "lastTransactionDate": "2018-12-28T11:48:02.927809-05:00"
            }
        }
    );
    
    productsMock.CREDIT_CARD.push(
        {
            "customerInformation": {
                "serviceProviderId": null,
                "customerPermanentId": null,
                "customerLoginId": null
            },
            "depositAccountInformation": {
                "accountIdentifier": faker.random.number(),
                "productType": "CREDIT_CARD",
                "bank": null
            },
            "creditCardAccountInformation": null,
            "loanAccountInformation": null,
            "accountBalance": {
                "amount": faker.random.number(),
                "currencyCode": "COP",
                "description": "Saldo_disponible",
                "lastTransactionDate": faker.date.future()
            }
        }
    );
}


module.exports.products = productsMock;


