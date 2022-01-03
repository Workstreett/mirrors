const express = require("express");
const router = express.Router();

const User = require("../schema/user");
const { Authenticate } = require("../middlewares/Auth");

router.post("/get/byId", Authenticate, (req, res) => {
	User.findById(req.user.id, (err, user) => {
		if (err) {
			console.log("Error in route /info/user/byId", err.message);
			res.status(503).send("server problem");
		}
		res.status(200).json(user);
	});
});

module.exports = router;
