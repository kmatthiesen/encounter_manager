'use strict';
const MongoClient = require('mongodb').MongoClient;
const mongoCreds = require('../../mongo.json');
const mongoUrl = 'mongodb://' + mongoCreds.username + ':' + mongoCreds.password +
    '@cluster0-shard-00-00-lurk8.mongodb.net:27017,cluster0-shard-00-01-lurk8.mongodb.net:27017,' +
    'cluster0-shard-00-02-lurk8.mongodb.net:27017/encounter-manager?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';
const ObjectId = require('mongodb').ObjectID;

class Mongo {

    constructor () {}

    /**
     * getAll returns an array of documents on success
     * @param  {string} collection name of collection to retrieve
     * @param  {object} filter filter object for query
     * @return {promise}
     */
    queryAsync (collection, filter) {
        return MongoClient.connect(mongoUrl).then((db) => {
            let coll = db.collection(collection);
            let data = coll.find(filter).toArray();
            // db.close();
            return data;
        }).catch((err) => {
            throw new Error(err);
        });
    }

    /**
     * Inserts an array of objects into the specified collection.
     * @param  {string} collection The string name of the collection to persist to
     * @param  {object[]} documents The array of objects to persist
     * @return {promise}
     */
    insertAsync (collection, record) {
        return MongoClient.connect(mongoUrl).then((db) => {
            let id = new ObjectId();
            record._id = id.toHexString();
            let coll = db.collection(collection);
            let data = coll.insertOne(record);
            db.close();
            return data;
        }).catch((err) => {
            throw new Error(err);
        });
    }
    /**
     * Updates an object in the specified collection.
     * @param  {string} collection The string name of the collection to persist to
     * @param  {object} doc a single object to update
     * @return {promise}
     */
    updateAsync (collection, doc) {
        return MongoClient.connect(mongoUrl).then((db) => {
            let coll = db.collection(collection);
            let filter = {
                _id: doc._id
            };
            let data = coll.replaceOne(filter, doc);
            db.close();
            return data;
        }).catch((err) => {
            throw new Error(err);
        });
    }
    /**
     * Deletes an object by Id in the specified collection.
     * @param  {string} collection The string name of the collection to persist to
     * @param  {string} id the id of the object to be deleted
     * @return  {promise}
     */
    deleteAsync (collection, id) {
        return MongoClient.connect(mongoUrl).then((db) => {
            let coll = db.collection(collection);
            return coll.deleteOne({
                _id: id
            }).catch((err) => {
                throw new Error(err);
            });
        });
    }
}

module.exports = new Mongo();
