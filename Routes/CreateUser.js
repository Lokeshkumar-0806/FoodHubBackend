// // // backend/routes/createuser.js
// // const express = require("express");
// // const router = express.Router();
// // const { body, validationResult } = require("express-validator");
// // const bcrypt = require("bcryptjs");
// // const jwt = require("jsonwebtoken");
// // const User = require("../models/User");

// // const JWT_SECRET = "ILOVEYOUTOOLOKUBABYBESANKLADOO";

// // // Signup route
// // router.post(
// //   "/createuser",
// //   [
// //     body("email").isEmail(),
// //     body("name").isLength({ min: 3 }),
// //     body("password", "Incorrect Password").isLength({ min: 5 }),
// //     body("location").isLength({ min: 1 }), // Validate location
// //   ],
// //   async (req, res) => {
// //     const errors = validationResult(req);
// //     if (!errors.isEmpty()) {
// //       return res.status(400).json({ errors: errors.array() });
// //     }
// //     try {
// //       const salt = await bcrypt.genSalt(10);
// //       const secPass = await bcrypt.hash(req.body.password, salt);

// //       const user = await User.create({
// //         name: req.body.name,
// //         email: req.body.email,
// //         password: secPass,
// //         location: req.body.location, // Save location
// //       });

// //       res.json({ success: true, user }); // Return success + user data
// //     } catch (err) {
// //       console.error(err);
// //       res.status(500).send("Server Error");
// //     }
// //   }
// // );




// // // Login route
// // router.post(
// //   "/loginuser",
// //   [body("email").isEmail(), body("password", "Password cannot be blank").exists()],
// //   async (req, res) => {
// //     const errors = validationResult(req);
// //     if (!errors.isEmpty()) {
// //       return res.status(400).json({ errors: errors.array() });
// //     }
// //     const { email, password } = req.body;
// //     try {
// //       let user = await User.findOne({ email });
// //       if (!user) {
// //         return res.status(400).json({ error: "Invalid Credentials" });
// //       }

// //       const pwdCompare = await bcrypt.compare(password, user.password);
// //       if (!pwdCompare) {
// //         return res.status(400).json({ error: "Invalid Credentials" });
// //       }

// //       const data = {
// //         user: { id: user.id },
// //       };
// //       const authToken = jwt.sign(data, JWT_SECRET);
// //       res.json({ success: true, authToken });
// //     } catch (err) {
// //       console.error(err);
// //       res.status(500).send("Server Error");
// //     }
// //   }
// // );

// // module.exports = router;




// const express = require("express");
// const router = express.Router();
// const User = require("../models/User"); // ✅ make sure User.js exists in models
// const bcrypt = require("bcryptjs"); // for password hashing

// // ✅ Signup Route
// router.post("/createuser", async (req, res) => {
//   try {
//     const { name, email, password, location } = req.body;

//     // 1. Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res
//         .status(400)
//         .json({ success: false, message: "User already exists" });
//     }

//     // 2. Hash the password before saving
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // 3. Create new user
//     const newUser = new User({
//       name,
//       email,
//       password: hashedPassword,
//       location,
//     });

//     await newUser.save();

//     res.status(201).json({ success: true, message: "User created successfully" });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// });

// // ✅ Login Route
// router.post("/loginuser", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // 1. Find user by email
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid credentials" });
//     }

//     // 2. Compare entered password with hashed password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid credentials" });
//     }

//     res.json({ success: true, message: "Login successful", user: { email: user.email, name: user.name } });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// });

// module.exports = router;


const express = require("express");
const router = express.Router();
const User = require("../models/User"); // ✅ make sure User.js exists in models
const bcrypt = require("bcryptjs"); // for password hashing

// ✅ Signup Route
router.post("/createuser", async (req, res) => {
  try {
    const { name, email, password, location } = req.body;

    // 1. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" }); // ✅ clear message
    }

    // 2. Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      location,
    });

    await newUser.save();

    res
      .status(201)
      .json({ success: true, message: "User created successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// ✅ Login Route
router.post("/loginuser", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    // 2. Compare entered password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    res.json({
      success: true,
      message: "Login successful",
      user: { email: user.email, name: user.name },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

module.exports = router;
