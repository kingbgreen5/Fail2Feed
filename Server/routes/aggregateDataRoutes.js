const express = require("express");
const router = express.Router();


// const { getAggregateData } = require("../controllers/aggregateController");
const { getAggregateData, getAggregateDataById } = require("../controllers/aggregateController");



// Route to get aggregate data with firearm details
router.get("/all", getAggregateData);



// Route to get aggregate data for a specific firearm
router.get("/:id", getAggregateDataById);



module.exports = router;