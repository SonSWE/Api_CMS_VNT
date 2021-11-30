'use strict';

const verifyToken = require('../Middleware/auth');
const homeRouter = require('./Home');
const loginRouter = require('./Login');
const adminRouter = require('./Admin');

function route(app) {
    app.use('/api/home', verifyToken,homeRouter);
    app.use('/api/login', loginRouter);
    app.use('/api/admin', adminRouter);
}

module.exports = route;