const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Company = new Schema({
	name: String,
	desc: String,
	logo: String,
	tnor: { type: Number, alias: "totalNumofRounds" },
	role: String,
	apply: String,
	jd: { type: String, default: "" },
	duration: String,
	stipend: String,
	unavailable: { type: Boolean, default: false },
});

module.exports = mongoose.model("company", Company);
