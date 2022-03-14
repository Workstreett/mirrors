const express = require("express");
const passport = require("passport");
const JWT = require("jsonwebtoken");

const router = express.Router();
require("dotenv").config();

router.post(
	"/google/callback",
	passport.authenticate("googlePlus", { session: false }),
	(req, res) => {
		try {
			const token = JWT.sign(
				{
					iss: "Workstreet",
					sub: req.user.id,
				},
				process.env.JSON_SECRET,
				{ expiresIn: "1day" }
			);

			res.json({
				token: token,
				user_data: {
					...req.user._doc,
				},
			});
		} catch (err) {
			console.log("Error occured while Authentication,", err.message);
			res.status(503).send("SignIn Failed!!");
		}
	}
);

module.exports = router;
