'use strict';

var router = require('express').Router();
const adminController = require("../controllers/AdminController");

router.post("/create-new-admin", adminController.Create);
router.get("/get-list-admin", adminController.GetListAdmin);
router.get("/find-with-username", adminController.Find);
router.put("/change-password", adminController.UpdatePassword);
router.put("/update-permission", adminController.UpdatePermissions);
router.delete("/delete", adminController.Delete);

module.exports = router;