let user = require('./user');
let products = require('./products');
let movements = require('./movements');
let statements = require('./statements');
let pdf = require('./pdf');
let pending = require('./pending');
let favorite = require('./favorites');
let historicPayments = require('./historicPayments');
let stocksAll = require('./stocks-all');
let stocksType = require('./stocks-type');
let stocksPeriod = require('./stocks-period');


let generateDB = () => {
  return {
    login: [user],
    products: products,
    movements: movements,
    statements: statements,
    pdf: pdf,
    pending,
    favorite,
    historicPayments,
    stocksAll: stocksAll,
    stocksPeriod: stocksPeriod,
    stocksType: stocksType
  };
};

module.exports = generateDB;
