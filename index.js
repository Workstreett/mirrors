const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
// Requiring all auth-routes
const AuthRoutes = require("./routes/auth");
const UserRoutes = require("./routes/user");
const CompanyRoutes = require("./routes/company");
// Running Passport Setup
require("./config/passport");

require("dotenv").config();

// all middlewares
app.use(express.json({ strict: false }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
mongoose
	.connect(process.env.MONGODB_URI)
	.then((res) => {
		console.log("Connection secured");
	})
	.catch((err) => {
		console.log(err.message);
	});

// all routers
app.use("/auth", AuthRoutes);
app.use("/user", UserRoutes);
app.use("/company", CompanyRoutes);

// Home Route
app.get("/", (req, res) => {
	res.sendFile(__dirname + "/templates/index.html");
});

// The server
console.log("The server is up and running");
app.listen(process.env.PORT || 3000);
