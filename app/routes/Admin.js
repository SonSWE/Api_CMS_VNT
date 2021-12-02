'use strict';

var router = require('express').Router();
const adminController = require("../controllers/AdminController");

router.post("/create-new-admin", adminController.CreateNewAdmin);
router.get("/get-list-admin", adminController.GetListAdmin);
router.get("/get-list-permissions", adminController.GetListPermissions);
router.get("/get-list-permissions-detail", adminController.GetPermissionsDetail);
router.get("/find-with-username", adminController.Find);
router.put("/change-password", adminController.UpdatePassword);
router.delete("/delete", adminController.Delete);

module.exports = router;