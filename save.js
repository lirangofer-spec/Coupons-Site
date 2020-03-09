const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'myproject';
const client = new MongoClient(url, { useNewUrlParser: true });

async function main() {
    await client.connect();
    console.log("Connected successfully to server");

    client.close();
}

main();