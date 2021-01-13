'use strict'

// Conection to mongoDB
const mongoose = require('mongoose');
const app = require('./app');
const port = 3700;

mongoose.set('useFindAndModify', false);
mongoose.promise = global.promise;

mongoose.connect('mongodb://localhost:27017/vet', { useNewUrlParser:true, useUnifiedTopology: true }
)
    .then(() => {
        console.log("Connected to database");

        //server
        app.listen(port, () => {
            console.log("Server running on localhost:3700")
        });

    })
    .catch(err => console.log(err)); 