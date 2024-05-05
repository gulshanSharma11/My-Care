import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const generatetoken = user => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "15d",
    }
  );
};

export const register = async (req, res) => {
  const { email, password, name, role, photo, gender } = req.body;

  try {
    let user = null;

    // Check if role is valid
    // if (role !== "patient" && role !== "doctor") {
    //   return res.status(400).json({ message: "Invalid role" });
    // }

    if (role === "patient") {
      user = await User.findOne({ email });
    } else if (role === "doctor") {
      user = await Doctor.findOne({ email });
    }

    // check if user exists
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Create user instance based on role
    if (role === "patient") {
      user = new User({
        name,
        email,
        password: hashPassword,
        photo,
        gender,
        role,
      });
    } else if (role === "doctor") {
      user = new Doctor({
        name,
        email,
        password: hashPassword,
        photo,
        gender,
        role,
      });
    }

    // Save the user
    await user.save();
    res
      .status(200)
      .json({ success: true, message: "User successfully created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal server error, Try again later",
    });
  }
};

export const login = async (req, res) => {
  const { email} = req.body;
  try {
    let user = null;
    const patient = await User.findOne({ email });
    const doctor = await Doctor.findOne({ email });

    if (patient) {
      user = patient;
    }
    if (doctor) {
      user = doctor;
    }
    // check if user exist or not]
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    //compare pasword

    const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid Password!" });
    }

    const token = generatetoken(user);

    const { password, role, appointments, ...rest } = user.toObject();
    res
      .status(200)
      .json({
        status: true,
        message: "Successfuly login",
        token,
        data: { ...rest },
        role,
      });
  } catch (err) {
    res.status(500).json({ status: false, message: "failed to login" });
  }
};
