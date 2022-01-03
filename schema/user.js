const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
	name: String,
	email: String,
	userImg: String,
	appliedFor: [
		{
			companyId: mongoose.Types.ObjectId,
			status: [String],
			round: [String],
			remarks: [String],
			roundDate: [Date],
		},
	],
});

module.exports = mongoose.model("user", User);
