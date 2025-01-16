import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const hash = bcrypt.hashSync(req.body.password, 10);
  const newUser = new User({
    ...req.body,
    password: hash,
  });

  await newUser.save();
  res.status(201).json(newUser);
};

export const login = async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    res.status(400).send("Invalid username or password!!");
    return;
  }

  const isPasswordCorrect = bcrypt.compareSync(
    req.body.password,
    user.password
  );
  if (!isPasswordCorrect) {
    res.status(400).send("Invalid username or password!!");
    return;
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_KEY);

  const { password, ...info } = user._doc;
  res
    .cookie("accessToken", token, {
      httpOnly: true,
    })
    .status(200)
    .json(info);
};

export const logout = async (req, res) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("Logged out!!");
};
