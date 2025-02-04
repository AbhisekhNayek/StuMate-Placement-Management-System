// Import required modules
import StudentUser from "../../Models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/**
 * Login Controller for Student
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await StudentUser.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User doesn't exist!" });
    }

    // Verify password and user role
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch || user.role !== "student") {
      return res.status(400).json({ msg: "Invalid credentials!" });
    }

    // Check if the student's application is approved by TPO
    if (!user.studentProfile?.isApproved) {
      return res
        .status(400)
        .json({ msg: "Your application is not approved by TPO yet. Please try again later!" });
    }

    // Generate JWT token
    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Save the token to the user's record
    user.token = token;
    await user.save();

    // Send the token as response
    return res.status(200).json({ token });
  } catch (error) {
    console.error("Error in student login controller:", error);
    return res.status(500).json({ msg: "Internal server error!" });
  }
};

// Export the Login function as a default export
export default Login;
