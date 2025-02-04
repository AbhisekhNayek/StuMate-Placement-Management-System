import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../Models/user.model.js';

// Controller for login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate email and password presence
    if (!email || !password) {
      return res.status(400).json({ msg: 'Email and Password are required!' });
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User Doesn't Exist!" });
    }

    // Validate password and role
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch || user.role !== 'management_admin') {
      return res.status(400).json({ msg: 'Invalid Credentials!' });
    }

    // Generate JWT token
    const payload = { userId: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Save token in user record (if required)
    user.token = token;
    await user.save();

    // Respond with the token
    return res.json({ token });
  } catch (error) {
    console.error('Error in login:', error);
    return res.status(500).json({ msg: 'Internal Server Error!' });
  }
};
