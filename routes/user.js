const express = require("express");
const router = express.Router();

const User = require("../schema/user");
const { Authenticate } = require("../middlewares/Auth");
const TaskRouter = require("./tasks");

router.post("/get/byId", Authenticate, (req, res) => {
	User.findById(req.user.id, (err, user) => {
		if (err) {
			console.log("Error in route /info/user/byId", err.message);
			res.status(503).send("server problem");
		}
		res.status(200).json(user);
	});
});

router.post("/add/", async (req, res) => {
	// It requires Company Id, email, name
	const roundObj = {
		icon: req.body.icon || "fas fa-user",
		name: req.body.roundName || "Resume Round",
		status: req.body.status || 0,
		date: req.body.roundDate,
		remark: req.body.remark,
	};
	const obj = {
		companyId: req.body.companyId,
		status: req.body.companyStatus,
		round: [roundObj],
	};

	try {
		// If the users exist with the companyId then update
		let user_data = await User.findOneAndUpdate(
			{
				email: req.body.email,
				"appliedFor.companyId": req.body.companyId,
			},
			{ $push: { "appliedFor.$.round": roundObj } }
		);
		if (user_data) {
			res.status(200).send("The user has been added Successfully!!");
			return;
		}
		// If the companyId does not exist but the user does
		user_data = await User.findOneAndUpdate(
			{ email: req.body.email },
			{ $push: { appliedFor: obj } }
		);
		if (user_data) {
			res.status(200).send("The user has been added Successfully!!");
			return;
		}
		user_data = new User({
			name: req.body.name,
			email: req.body.email,
			appliedFor: [obj],
		});
		user_data.save();
		res.status(200).send("The user has been added Successfully!!");
	} catch (err) {
		console.log(err.message);
		res.status(503).send("Server Side Error");
	}
});

router.use("/tasks", TaskRouter);

module.exports = router;
