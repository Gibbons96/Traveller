const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/users");
const pinRoute = require("./routes/pins");
const authRoute = require("./routes/auth");
const session = require("express-session");
const cors=require("cors");
dotenv.config();
const passport =require("passport");
const passportUtil=require("./passport");

app.use(express.json());

// mongoose
//  .connect(process.env.MONGO_URL, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         useCreateIndex: true,   })
//  .then(() => console.log("MongoDB connected!"))
//  .catch(err => console.log(err));

mongoose
  .connect("mongodb://127.0.0.1/amjad")
  .then(() => console.log(""))
  .catch((err) => console.log(err));

app.use(
  session({
    name: "googleLogin",
    //TODO change the secret key in prod
    secret: "thesecretkey",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    }
  })
);
app.use(cors({
  origin:"http://localhost:3000",
  methods:"GET,POST,PUT,DELETE",
  credentials:true,
}))
app.use("/api/users/", userRoute);
app.use("/api/pins/", pinRoute);
app.use("/auth/", authRoute);
// Logout route
app.get('/logout', (req, res) => {
  console.log('Session before destruction:', req.session);

  req.session.destroy(err => {
    if (err) {
      console.error('Session destruction failed:', err);
      return res.status(500).json({ message: 'Failed to log out' });
    }

    res.clearCookie('googleLogin', {
      path: '/',
      httpOnly: true,
      secure: false,
      sameSite: 'Lax'
    });

    console.log('Session destroyed:', req.session); // Should be undefined
    res.status(200).json({ message: 'Logged out successfully' });
  });
});

// Endpoint to check if the session exists and is valid
app.get('/check-session', (req, res) => {
  if (req.session && req.session.passport && req.session.passport.user) {
    res.status(200).json({ isAuthenticated: true, user: req.session.passport.user });
  } else {
    res.status(200).json({ isAuthenticated: false });
  }
});

app.listen(5000, () => {
  console.log("Backend server is running!");
});
