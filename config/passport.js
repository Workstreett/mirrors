const passport = require("passport");
const GooglePlusStrategy = require("passport-google-plus-token");
const User = require("../schema/user");
require("dotenv").config();

// passport.serializeUser((user, done) => {
// 	done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
// 	User.findById(id).then((user) => {
// 		done(null, user);
// 	});
// });

passport.use(
	"googlePlus",
	new GooglePlusStrategy(
		{
			clientID: process.env.AUTH_CLIENT_ID,
			clientSecret: process.env.AUTH_CLIENT_SECRET,
		},
		async (accessToken, refreshToken, profile, next) => {
			// console.log(access, refresh);
			console.log("Passport cb function fired");
			// console.log(profile);
			// find user from the users model based on email...
			User.findOne(
				{ email: profile.emails[0].value },
				async (err, user) => {
					if (user) {
						user.userImg = profile.photos[0].value;
					}
					await user.save();
					if (err) {
						console.log(err.message);
					}
					next(null, user);
				}
			);
		}
	)
);
