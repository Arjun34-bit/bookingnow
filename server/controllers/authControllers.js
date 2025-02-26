const User = require("../models/Users");
const Vendor = require("../models/Vendor");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    if (role === "vendor") {
      const newVendor = new Vendor({
        name,
        email,
        password: hashedPassword,
        role,
      });
      await newVendor.save();
      return res
        .status(201)
        .json({ message: "Vendor registered successfully" });
    }
    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error registering user" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      const vendor = await Vendor.findOne({ email });
      if (!vendor || !(await bcrypt.compare(password, vendor.password))) {
        return res.status(404).json({ message: "Invalid credentials" });
      } else {
        const token = jwt.sign(
          { userId: vendor._id, role: vendor.role },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );
        res.json({ token, role: vendor.role, name: vendor.name });
      }
      // return res.status(404).json({ message: "Invalid credentials" });
    } else {
      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      return res.json({ token, role: user.role, name: user.name });
    }
  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
};

const getUser = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);
    res
      .status(200)
      .json({ token: user.token, role: user.role, name: user.name });
  } catch (error) {}
};

module.exports = { register, login };
