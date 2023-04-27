
const mongoose = require('mongoose');
const env = require('./environment');

mongoose.connect(`mongodb://localhost/${env.db}`);

const db = mongoose.connection;

db.on('error',console.error.bind(console,"Error while connecting to mongodb"));

db.once('open',function(){
    console.log('connected to database mongodb');
});

module.exports = db;