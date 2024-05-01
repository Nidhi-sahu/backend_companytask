
const express = require('express');
const routeuser = express.Router();

const {
    signup, login, protectedroute
} = require("../Controller/usercontroller")


routeuser.post('/signup', signup);
routeuser.post('/login', login);
routeuser.get('/protected_route',protectedroute)

module.exports = routeuser;
