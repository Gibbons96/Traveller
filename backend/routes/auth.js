const router = require("express").Router();
const passport = require("passport");

const CLIENT_URL = "http://localhost:3000/";

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login/failed",
  }),
  (req, res) => {
    // At this point, the user is authenticated and the session is set
    // You can now safely redirect the user to the client
    res.redirect(CLIENT_URL);
  }
);


router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "Login failed!",
  });
});

module.exports = router;
