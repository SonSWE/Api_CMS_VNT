'use strict';

var router = require('express').Router();
const adminController = require("../controllers/AdminController");

router.post("/create-new-admin", adminController.Create);
router.get("/get-list-admin", adminController.FindAll);
router.get("/find-by-username", adminController.FindByUsername);
router.get("/find-by-name", adminController.FindByName);
router.put("/change-password", adminController.UpdatePassword);
router.delete("/delete", adminController.Delete);

module.exports = router;