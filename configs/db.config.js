const mongoose = require('mongoose');
const dbName = 'qpisos';
const dbUri = `mongodb://localhost/${dbName}`;

mongoose.connect(dbUri, { useMongoClient: true });
mongoose.promise = Promise;

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log(`Connected to the ${dbName} database`);
});

