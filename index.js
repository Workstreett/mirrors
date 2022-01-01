const express = require("express");
const cors = require("cors");
const app = express();

require("dotenv").config();

// all middlewares
app.use(express.json({ strict: false }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// all routers
app.get("/", (req, res) => {
	res.sendFile(__dirname + "/templates/index.html");
});

// The server
console.log("The server is up and running");
app.listen(process.env.PORT || 3000);
