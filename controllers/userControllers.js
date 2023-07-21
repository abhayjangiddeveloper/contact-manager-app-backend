const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// @desc Register a user
// @route POST /api/user/register
// @access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, gender } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All field are mandatory!");
  }

  const userAvailable = await User.findOne({ email });

  if (userAvailable) {
    res.status(400);
    throw new Error("This user are already Register");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const register = await User.create({
    username,
    email,
    password: hashedPassword,
    gender,
  });

  if (register) {
    res.status(201).json({
      _id: register.id,
      email: register.email,
      gender: register.gender,
    });
  } else {
    res.status(400);
    throw new Error("user data us not valid");
  }

  res.status(201).json({ message: "user register" });
});

// @desc login a user
// @route POST /api/user/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("all field are required");
  }

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRETE,
      { expiresIn: "1y" }
    );
    res.status(200).json({ accessToken, user });
  } else {
    res.status(401);
    throw new Error("email or password not valid");
  }
});

// localhost:5000/api/user/update/profile/64a6c2617368d8cbc8eb92aa

// @desc current user information
// @route GET /api/user/current
// @access private
const currentUser = asyncHandler(async (req, res) => {
  const userInfo = await User.find({ email: req.user.email });
  const userInformation = {
    id: userInfo[0]._id,
    username: userInfo[0].username,
    email: userInfo[0].email,
    gender: userInfo[0].gender,
  };
  res.status(200).json(userInformation);
});

// @desc current user information
// @route GET /api/user/update/profile/:id
// @access private
const updateProfile = asyncHandler(async (req, res) => {
  const updateProfileId = await User.findById(req.params.id);

  if (!updateProfileId) {
    res.status(404);
    throw new Error("No Contact Found");
  }
  const { password } = req.body;

  if (password) {
    res.status(401);
    throw new Error("password field are not changeable");
  }

  // const profilePicture = req.file.buffer.toString("base64");

  const profilePicture = `localhost:5000/profile-pictures/${req.file.originalname}`;

  const profileUpdate = await User.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
      profile_picture: profilePicture,
    },
    {
      new: true,
    }
  );
  res.status(200).json(profileUpdate);
});

module.exports = { registerUser, loginUser, currentUser, updateProfile };
