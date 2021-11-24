'use strict';

const verifyToken = require('../Middleware/auth');
const homeRouter = require('./Home');
const loginRouter = require('./Login');

function route(app) {
    app.use('/api/home', verifyToken,homeRouter);
    app.use('/api/login', loginRouter);
}

module.exports = route;