const { MongoClient } = require("mongodb");

const Db = process.env.ATLAS_URI;

const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var _db;

module.exports = {

  connectToServer: function (callback) {

    client.connect(function (err, db) {
      // Verify we got a good "db" object
      if (db) {
        _db = db.db("etrainit");
        console.log("Successfully connected to MongoDB.");
      }
      return callback(err);
    });
  },

  call: function () {
    return _db;
  },

  getDb: function () {
    return _db;
  },

  get: (res, collection, find, project, sort) => {
    _db.collection(collection).find(find).project(project).sort(sort).toArray((err, result) => {
      if (err) throw err;
      res.json(result);
    });
  },

  getOne: (res, collection, find, project) => {
    _db.collection(collection).find(find).project(project).limit(1).toArray((err, result) => {
      if (err) throw err;
      res.json(result[0]);
    });
  },

  insert: (res, collection, data) => {
    _db.collection(collection).insertOne(data, (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  },

  insertMany: (res, collection, data) => {
    _db.collection(collection).insertMany(data, (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  },

  delete: (res, collection, data) => {
    _db.collection(collection).deleteOne(data, (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  },

  update: (res, collection, data, value) => {
    _db.collection(collection).updateMany(data, value, (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  },

  updateOne: (res, collection, find, value) => {
    _db.collection(collection).updateOne(find, { $set: value }, (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  },

};