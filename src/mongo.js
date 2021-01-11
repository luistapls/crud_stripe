require('dotenv').config();

const { MongoClient } = require('mongodb');

const url = process.env.URL_MONGO;
const dbName = process.env.DB_NAME;

class MongoLib {
  constructor() {
    this.client = new MongoClient(url, { useUnifiedTopology: true });
    this.dbName = dbName;
  }

  connect() {
    if (!MongoLib.connection) {
      MongoLib.connection = new Promise((resolve, reject) => {
        this.client.connect((err) => {
          if (err) {
            reject(err);
          }
          resolve(this.client.db(this.dbName));
        });
      });
    }
    return MongoLib.connection;
  }

  getAll(collection) {
    return this.connect().then((db) =>
      db.collection(collection).find().toArray(),
    );
  }

  get(collection, productNumber) {
    return this.connect().then((db) =>
      db.collection(collection).findOne({ number: productNumber }, { _id: 0 }),
    );
  }

  create(collection, data) {
    return this.connect()
      .then((db) => db.collection(collection).insertOne(data))
      .then((result) => result.insertedId);
  }

  update(collection, productNumber, product) {
    return this.connect().then((db) =>
      db
        .collection(collection)
        .updateOne({ number: productNumber }, { $set: product }),
    );
  }

  delete(collection, productNumber) {
    return this.connect().then((db) =>
      db.collection(collection).deleteOne({ number: productNumber }),
    );
  }

  countCollection(collection) {
    return this.connect().then((db) =>
      db.collection(collection).countDocuments(),
    );
  }

  closeClient() {
    this.client.close();
  }
}
module.exports = MongoLib;
