const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../../models/users");
const keys = require("../../config/keys");

//@route POST api/users
//@desc This is a test route
//@access Public
router.post(
  "/",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with six or more characters"
    ).isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    // generate id
    const id = Math.floor(Math.random() * 100000000);

    try {
      let user = await User.getUserByEmail(email);
      //Does user exist?
      if (user.rows.length >= 1) {
        return res.status(400).send({ errors: [{ message: "User already exists" }] });
      }

      user = new User(
        id,
        email,
        password,
        name
      );

      //salt password, default 10
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.createUser();

      //Create payload
      const payload = {
        user: {
          id: user.id
        }
      };
      //Expiration date extreme for testing purposes
      jwt.sign(
        payload,
        keys.jwtSecret,
        {
          expiresIn: 360000
        },
        (err, token) => {
          if (err) throw err;
          res.json({
            token
          });
        }
      );
      //Check if user exits
      //Encrypt password
      //Return json webtoken
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
