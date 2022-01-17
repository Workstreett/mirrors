const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
	name: String,
	email: String,
	userImg: String,
	appliedFor: [
		{
			companyId: mongoose.Types.ObjectId,
			status: String,
			round: [
				{
					icon: { type: String, default: "fas fas-circle" },
					name: { type: String, required: true },
					date: { type: String, default: Date.now() },
					remark: { type: String, default: "Pending" },
					status: Boolean,
				},
			],
		},
	],
});

module.exports = mongoose.model("user", User);
