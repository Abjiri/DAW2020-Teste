const mongoose = require('mongoose')

var batismoSchema = new mongoose.Schema({
    _id: String,
    date: String,
    title: String,
    ref: String,
    href: String,
    pai: String,
    mae: String
  });

module.exports = mongoose.model('batismo', batismoSchema)