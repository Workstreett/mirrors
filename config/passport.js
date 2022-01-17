const passport = require("passport");
const GoogleTokenStrategy = require("passport-google-token").Strategy;
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
	new GoogleTokenStrategy(
		{
			clientID: process.env.AUTH_CLIENT_ID,
			clientSecret: process.env.AUTH_CLIENT_SECRET,
		},
		async (accessToken, refreshToken, profile, next) => {
			// console.log(access, refresh);
			// console.log("Passport cb function fired");
			// console.log(profile);
			// find user from the users model based on email...
			User.findOne(
				{ email: profile.emails[0].value },
				async (err, user) => {
					try {
						if (user) {
							user.userImg = profile._json.picture;
							await user.save();
						} else {
							// Save the new user Info
							const new_user = new User({
								name: profile.displayName,
								email: profile.emails[0].value,
								userImg: profile._json.picture,
								appliedFor: [],
							});
							await new_user.save();
							next(null, new_user);
						}
						if (err) {
							console.log(err.message);
						}
						next(null, user);
					} catch (error) {
						console.log("called!");
						next(error, {});
					}
				}
			);
		}
	)
);
