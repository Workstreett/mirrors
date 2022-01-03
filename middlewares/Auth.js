const jwt = require("jsonwebtoken");
require("dotenv").config();

const Authenticate = (req, res, next) => {
	jwt.verify(req.body.token, process.env.JSON_SECRET, (err, payload) => {
		if (err) {
			console.log("Error in file user.js", err.message);
			res.send("Unauthorised");
		}
		console.log(payload);
		req.user = { id: payload.sub };
		next();
	});
};

module.exports = { Authenticate };
