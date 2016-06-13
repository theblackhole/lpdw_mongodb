'use strict';
const faker         = require('faker');
const MongoClient   = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/music', (err, db) => {
    let users = [];

    for (var i = 0; i <= 1000; i++) {
        users.push({
            "_id": faker.internet.userName(),
            "displayName": faker.name.firstName() + " " + faker.name.lastName(),
            "email": faker.internet.email()
        });
    }

    db.collection('users').insertMany(users)
        .then(users => { console.log(users); })
        .catch(err => { console.log(err); })
        .then(() => db.close())
    ;
});
