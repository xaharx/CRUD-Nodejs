var express = require('express');
var db = require('../db');
var router = express.Router();
var result;
var connection;

var fs = require('fs');

db.connect('mongodb://localhost:27017/',function(conn){
    connection = conn;
});

router.get('/id/:id', function(req, response, next) {

   db.find(connection,{id: req.params.id}, function(r){

       //result = JSON.stringify(r);

       if(r != '')
           response.send({status:'0',message: 'User found',result:r});
       else
           response.send({status:'1',message: 'Record not found',result:r});
   });
});

router.post('/add', function(req, response, next) {

    db.insert(connection,req.body, function(r){
        response.send({status:'0',message: 'User added successfully'});
    });
});

router.delete('/deleteone/:id', function(req, response, next) {

    db.deleteOne(connection,{id: req.params.id}, function(r){
        response.send({status:'0',message: 'User deleted successfully'});
    });
});

router.delete('/deletemany/:id', function(req, response, next) {

    db.deleteMany(connection,{id: req.params.id}, function(r){
        response.send({status:'0',message: 'Users deleted successfully'});
    });
});


router.put('/update', function(req, response, next) {

    db.update(connection, req.body.oldValue, req.body.newValue,function(r){
        response.send({status:'0',message: 'User update successfully'});
    });
});



module.exports = router;