const express = require("express");
const router = express.Router();
const User = require("../schema/user");

router.post("/add", async (req, res) => {
	try {
		const obj = {
			title: req.body.title,
			desc: req.body.desc,
			deadline: req.body.deadline
				? new Date(req.body.deadline)
				: undefined,
			submission: req.body.submission,
		};
		const data = await User.findOneAndUpdate(
			{ email: req.body.email },
			{ $addToSet: { tasks: obj } }
		);
		if (!data) {
			res.status(200).send("User does not exist");
		} else {
			res.status(200).send("Added a Task");
		}
	} catch (err) {
		console.log("Error occured while adding Task to a user", err.message);
		res.status(503).send("Server side Error");
	}
});

router.post("/edit", async (req, res) => {
	try {
		const { email, ind, submission } = req.body;
		if (!ind) {
			res.status(503).send("Index of tasks is required");
		}
		const updateString = `tasks.${ind}.submission`;
		const data = await User.findOne({
			email: email,
		});
		if (!data) {
			res.status(200).send("User does not exists");
		} else {
			if (data.tasks.length <= ind) {
				res.status(200).send("Tasks does not exist");
			} else {
				data["tasks"][ind]["submission"] = submission;
				await data.save();
				res.status(200).send("Updated the Submission");
			}
		}
	} catch (err) {
		console.log(
			"Error arised while Updating the user submission ",
			err.message
		);
		res.status(503).send("Server side Error");
	}
});

module.exports = router;
