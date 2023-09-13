let faker = require('faker');

const userMock = {
  "name": faker.name.findName(),
  "address": faker.address.city(),
  "id": faker.random.number(),
  "avatar": faker.image.avatar()
};

module.exports = userMock;


