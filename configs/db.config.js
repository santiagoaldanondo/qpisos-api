const mongoose = require('mongoose');
const dbName = 'qpisos';
const dbUri = `mongodb://heroku_szzg7jd3:pfcder3gvmenb5bkckbu26oob8@ds257245.mlab.com:57245/heroku_szzg7jd3`;

mongoose.connect(dbUri, { useMongoClient: true });
mongoose.promise = Promise;

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log(`Connected to the ${dbName} database`);
});

module.exports = db