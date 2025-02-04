import StudentUser from "../../Models/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const Login = async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ msg: "Email and Password are required!" });
  }

  try {
    // Find user by email with minimal fields (only password and role)
    const user = await StudentUser.findOne({ email }).select('password role');
    
    if (!user) {
      return res.status(400).json({ msg: "User doesn't exist!" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch || user.role !== "superuser") {
      return res.status(400).json({ msg: 'Credentials do not match!' });
    }

    // Generate JWT token
    const payload = { userId: user.id };
    let token;
    try {
      token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    } catch (jwtError) {
      console.error('JWT creation error:', jwtError);
      return res.status(500).json({ msg: "Error generating token" });
    }

    // Update token in user record
    user.token = token;
    await user.save();

    return res.json({ token });
  } catch (error) {
    console.error("admin.login.js =>", error);
    return res.status(500).json({ msg: "Internal Server Error!" });
  }
};

export default Login;
