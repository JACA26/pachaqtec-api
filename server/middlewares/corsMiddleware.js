const express = require('express');
const app = express();
const cors = require('cors');

//Whitelist of origins that are allowed to access the API
const whitelist = ['http://localhost:3000', 'http://localhost:3001'];
const corsOptionsDelegate = (req, callback) => {
    let corsOptions;
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
    } else {
        corsOptions = { origin: false }; // disable CORS for this request
    }
    callback(null, corsOptions); // callback expects two parameters: error and options
};


// habilitar cors
// app.use(cors(corsOptionsDelegate)); //protected request
app.use(cors());               //public request

module.exports = app;