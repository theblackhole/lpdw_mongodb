'use strict';
const faker         = require('faker');
const MongoClient   = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/music', (err, db) => {
    const UserCol = db.collection('users');

    UserCol.find({"favoriteSongs": {total: 0}}).toArray()
        .then(users => { console.log(users); })
        .catch(err => { console.log(err); })
        .then(() => db.close())
});
