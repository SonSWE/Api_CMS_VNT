'use strict';

var router = require('express').Router();
const PermissionsController = require("../controllers/PermissionsController");

router.get("/get-list-permissions", PermissionsController.FindAll);

module.exports = router;