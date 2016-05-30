const faker         = require('faker');
const moment        = require('moment');
const MongoClient   = require('mongodb').MongoClient;
let user = {
    username:           faker.name.firstName(),
    creationDate:       moment(faker.date.past()).format(),
    companyName:        faker.company.companyName(),
    shortDescription:   faker.lorem.sentence(),
    iconUrl:            faker.image.imageUrl(),
    url:                faker.internet.url()
};
MongoClient.connect('mongodb://localhost', (err, db) => {
    db.collection('users').insertOne(user)
    .then(user => { console.log(user); })
.catch(err => { console.log(err); })
.then(() => db.close())
;
}):
