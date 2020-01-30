var sqlite3 = require('sqlite3').verbose()
const express = require('express')
const app = express()
app.use(express.static('public'));
app.set('view engine', 'pug')
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: true })
app.use(urlencodedParser);
app.use(bodyParser.json());

var db = new sqlite3.Database('pokemongo.db');
var user = 'user_1';

app.get('/', function (req, res, next) {
    var query = "\
        SELECT pokemon_name,strongth\
        FROM pokemon\
        WHERE user_id = '"+user+"' \
        ";
    console.log(query);
    db.all(query, {}, function (err, rows) {
        if (err) {
            console.log("ERROR: " + err.message);
        }
        res.render('index', {
            results: rows
        })
    });
    next;
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))
