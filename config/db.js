const {MongoClient} = require('mongodb');
require('dotenv').config();

const client = new MongoClient(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

let db;

const connectDB = async () => {
    try {
        await client.connect();
        db = client.db('Profiles');
        console.log('Connected to the database');
    } catch(error) {
        console.error('Error connecting to the database');
        console.error(error);  
    }
}

const getDb = () => db;


module.exports = {connectDB, getDb}