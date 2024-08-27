const express = require("express");
const router = express.Router();
const { getAllListController } = require("../Controllers/getAllLists");
const { getSearchList } = require("../Controllers/getSearchList");
const {findAndUpdateData} = require("../Controllers/findAndUpdateData");
const {findAndDeleteData} = require("../Controllers/findAndDelete");
router.get("/allList", getAllListController);
router.post("/search", getSearchList);
router.post('/update', findAndUpdateData)
router.post('/delete', findAndDeleteData)
module.exports = router;
