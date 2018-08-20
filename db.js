
var MongoClient = require('mongodb').MongoClient;

var state = {
    db: 'FirstTestDB',
}

exports.connect = function(url, done) {

    MongoClient.connect(url, function(err, conn) {

        if (err) return done(err);

        return done(conn);

    });
}

exports.get = function() {
    return state.db;
}

exports.find = function(conn,id, callback) {

     conn.db(state.db).collection('Users').find(id).toArray(function(err, result) {

        if (err) throw err;

        return callback(result);
    });
}

exports.insert = function(conn,obj, callback) {

    conn.db(state.db).collection('Users').insert(obj, function(err, result) {

        if (err) throw err;

        return callback(result);
    });
}

exports.deleteOne = function(conn,name, callback) {

    conn.db(state.db).collection('Users').deleteOne(name, function(err, result) {

        if (err) throw err;

        return callback(result);
    });
}

exports.deleteMany = function(conn,name, callback) {

    conn.db(state.db).collection('Users').deleteMany(name, function(err, result) {

        if (err) throw err;

        return callback(result);
    });
}

exports.update = function(conn,oldvalue,newvalue, callback) {

    conn.db(state.db).collection('Users').updateOne(oldvalue,{$set: newvalue}, function(err, result) {

        if (err) throw err;

        return callback(result);
    });
}

exports.close = function(done) {
    if (state.db) {
        state.db.close(function(err, result) {
            state.db = null;
            state.mode = null;
            done(err);
        });
    }
}