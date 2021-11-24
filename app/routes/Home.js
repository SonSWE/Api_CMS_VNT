'use strict';

var router = require('express').Router();
const homeController = require("../controllers/HomeController");

router.get("/get-list-config", homeController.GetListConfig);
router.get("/find", homeController.Find);
router.post("/create", homeController.Create);
router.put("/update", homeController.Update);
router.delete("/delete", homeController.Delete);

module.exports = router;