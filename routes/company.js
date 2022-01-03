const express = require("express");
const router = express.Router();
const { Authenticate } = require("../middlewares/Auth");
const Company = require("../schema/company");

router.post("/get/byId", Authenticate, (req, res) => {
	Company.findById(req.body.id, (err, data) => {
		if (err) {
			console.log("Error is in route /company/get/byId ", err.message);
			res.status(503).send("Server Problem");
		}

		res.json(data);
	});
});

router.post("/get/all", Authenticate, (req, res) => {
	Company.find({}, (err, data) => {
		if (err) {
			console.log("Error is in route /get/all ", err.message);
			res.status(503).send("Server Problem");
		}
		res.json(data);
	});
});

module.exports = router;
