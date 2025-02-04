import User from "../../Models/user.model.js";
import bcrypt from 'bcrypt';

/**
 * Handles user signup
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const Signup = async (req, res) => {
  const { first_name, email, number, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User Already Exists!" });
    }

    // Hash the password before storing
    const hashPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      first_name,
      email,
      number,
      password: hashPassword,
      role: "student",
      studentProfile: {
        isApproved: false
      }
    });

    // Save the user to the database
    await newUser.save();
    
    // Send success response
    return res.status(201).json({ msg: "User Created!" });
  } catch (error) {
    console.error("student.signup.controller.js => ", error);
    return res.status(500).json({ msg: "Internal Server Error!" });
  }
};

export default Signup;
