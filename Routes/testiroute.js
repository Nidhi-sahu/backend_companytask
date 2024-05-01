const express = require('express');
const routetesti = express.Router();

const  {
    testgetProducts
} = require ('../Controller/testicontroller')


routetesti.get('/gettest', testgetProducts);

module.exports = testgetProducts