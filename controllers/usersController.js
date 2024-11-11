const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

module.exports = {
  login(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    User.findByEmail(email, async (err, user) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "There was an error on user registration",
          error: err,
        });
      }
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Email not found",
          error: err,
        });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        const token = jwt.sign(
          { id: user.id, email: user.email },
          keys.secretOrKey,
          {}
        );
        const data = {
          id: user.id,
          name: user.name,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          image: user.image,
          session_token: `JWT ${token}`,
        };
        return res.status(201).json({
          success: true,
          message: "User authenticated",
          data: data,
        });
      } else {
        return res.status(401).json({
          success: false,
          message: "Wrong password",
          error: err,
        });
      }
    });
  },

  register(req, res) {
    const user = req.body;
    User.create(user, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "There was an error on user registration",
          error: err,
        });
      }
      return res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: data,
      });
    });
  },
};
