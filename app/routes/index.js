'use strict';

const verifyToken = require('../Middleware/auth');
const homeRouter = require('./Home');
const loginRouter = require('./Login');
const adminRouter = require('./Admin');
const permissionsRouter = require('./Permissions');

function route(app) {
    app.use('/api/home',homeRouter);
    app.use('/api/login', loginRouter);
    app.use('/api/admin', adminRouter);
    app.use('/api/permissions', permissionsRouter);
}

module.exports = route;