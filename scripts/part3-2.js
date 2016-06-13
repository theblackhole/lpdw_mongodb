'use strict';
const faker         = require('faker');
const MongoClient   = require('mongodb').MongoClient;

const UserCol = db.collection('users');
const SongCol = db.collection('songs');

MongoClient.connect('mongodb://localhost:27017/music', (err, db) => {

    UserCol.find({}).forEach((user) => {
        let totalFavoriteSongs = Math.floor(Math.random() * 11);

        SongCol.aggregate([{$sample: {total: totalFavoriteSongs}}], (aggregation) => {
            
            })
        });
    });

    db.collection('users').insertMany(users)
        .then(users => { console.log(users); })
        .catch(err => { console.log(err); })
        .then(() => db.close())
    ;
});
