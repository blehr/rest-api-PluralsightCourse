const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const port = process.env.PORT || 8080;
const host = process.env.IP || '0.0.0.0';

var db;

if (process.env.ENV == 'Test') {
    db = mongoose.connect('mongodb://' + host + '/bookAPI_test');
} else {
    db = mongoose.connect('mongodb://' + host + '/bookAPI');
}

const app = express();

const Book = require('./models/bookModel');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const bookRouter = require('./routes/bookRoutes')(Book);


    
app.use('/api/books', bookRouter);

app.get('/', (req, res) => {
    res.send("welcome to my api");
});


app.listen(port, host, () => {
    console.log('Running on PORT ' + port + ' on HOST ' + host);
});

module.exports = app;