const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookModel = new Schema ({
    title: String,
    author: String,
    genre: String,
    read: {type: Boolean, default: false}
});

module.exports = mongoose.model('Book', bookModel);