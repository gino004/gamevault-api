const express = require("express");
const passport = require("passport");

const router = express.Router();

// Home
router.get("/", (req, res) => {
	if (req.session.user !== undefined) {
		res.send(`Logged in as ${req.session.user.displayName}`);
	} else {
		res.send("Logged Out");
	}
});

// Login
router.get("/login", passport.authenticate("github", { scope: ["user:email"] }));

// GitHub callback
router.get("/github/callback", passport.authenticate("github", { failureRedirect: "/api-docs", session: false }),
	(req, res) => {
		req.session.user = req.user;
		res.redirect("/api-docs");
	}
);

// Logout
router.get("/logout", (req, res, next) => {
	req.session.destroy((err) => {
		if (err) {
			return next(err);
		}

		req.logout(function (err) {
			if (err) {
				return next(err);
			}

			res.redirect("/");
		});
	});
});

module.exports = router;