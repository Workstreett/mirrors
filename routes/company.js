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
		else{
			res.json(data);
		}
	});
});

router.post("/get/all", Authenticate, (req, res) => {
	Company.find({}, (err, data) => {
		if (err) {
			console.log("Error is in route /get/all ", err.message);
			res.status(503).send("Server Problem");
		}else{
			res.json(data);
		}
	});
});

router.post("/add/", (req, res) => {
	Company.find({ name: req.body.name, role: req.body.role }, (err, data) => {
		// console.log(err, data);
		if (err) {
			console.log(
				"While calling company/add/ Error arised ",
				err.message
			);
			res.status(503).send(err.message);
		}
		if (data) {
			res.status(200).send(data);
		} else {
			const new_company = new Company({
				name: req.body.name,
				desc: req.body.desc,
				logo: req.body.logo,
				role: req.body.role,
				tnor: req.body.tnor | 0,
			});
			new_company
				.save()
				.then((data) => {
					res.status(200).send(data);
				})
				.catch((err) => {
					console.log(
						"While calling company/add/ Error arised ",
						err.message
					);
					res.status(503).send(err.message);
				});
		}
	});
});

router.post("/edit/byId", (req, res) => {
	Company.findByIdAndUpdate(
		req.body.Id,
		{ desc: req.body.desc, logo: req.body.logo },
		(err, data) => {
			if (err) {
				console.log(
					"While calling company/edit/byId/ Error arised ",
					err.message
				);
				res.status(503).send(err.message);
			}
			res.status(200).send("The Data has mutated Successfully");
		}
	);
});

module.exports = router;
