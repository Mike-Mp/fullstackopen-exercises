const User = require("../models/user");
const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");

usersRouter.get("/", async (req, res) => {
  const users = await User.find({});
  res.json(users.map((u) => u.toJSON()));
});

usersRouter.post("/", async (req, res, next) => {
  const body = req.body;

  if (body.password.length < 3) {
    return res.status(400).json({
      error: "Password must be at least 3 characters long.",
    });
  }

  const saltRounds = 10;

  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const newUser = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  try {
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (exception) {
    next(exception);
  }
});

module.exports = usersRouter;
