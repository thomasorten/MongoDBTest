const express = require('express')
const app = express()
var MongoClient = require('mongodb').MongoClient
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var data
var database

MongoClient.connect('mongodb://localhost:27017/animals', function (err, db) {
    if (err) throw err

    database = db;

    database.collection('mammals').find().toArray(function (err, result) {
        if (err) throw err

        data = result
        console.log(result)
    })

    app.listen(3000, () => console.log('Example app listening on port 3000!'))
})

app.get('/', (req, res) => res.sendFile('/home/thomas/WebstormProjects/MongoDBTest/index.html'))

app.post('/', function (req, res) {

    console.log(req.body.brukernavn)
    console.log(req.body.passord)

    database.collection('mammals').insertOne(
        { "brukernavn": req.body.brukernavn, "passord": req.body.passord }, function(err, r) {
            res.send("ok!");
        });

})