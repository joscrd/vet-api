'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Model
const PetSchema = Schema({
    name: String,
    age: String,
    animal: String,
    gender: String,
    diagnostic: String,
    prescription: String,
    image: String,
    date: Date
});

module.exports = mongoose.model('Pet', PetSchema);