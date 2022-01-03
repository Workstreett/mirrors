const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Company = new Schema({
	name: String,
	desc: String,
	logo: String,
	tnor: { type: Number, alias: "totalNumofRounds" },
	role: String,
});

module.exports = mongoose.model("company", Company);
