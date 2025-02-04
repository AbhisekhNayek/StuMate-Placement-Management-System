import User from "../../Models/user.model.js";
import bcrypt from "bcrypt";

// Get all management users
const managementUsers = async (req, res) => {
  try {
    const managementUsersList = await User.find({ role: "management_admin" });
    res.json({ managementUsers: managementUsersList });
  } catch (error) {
    console.error("Error fetching management users: ", error);
    return res.status(500).json({ msg: "Error fetching management users!" });
  }
};

// Add a new management user
const managementAddUsers = async (req, res) => {
  const { email, first_name, number, password } = req.body;

  // Validate required fields
  if (!email || !first_name || !number || !password) {
    return res.status(400).json({ msg: "Please provide all required fields: email, first_name, number, and password." });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists!" });
    }

    // Hash the password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create a new management user
    const newUser = new User({
      first_name,
      email,
      number,
      password: hashPassword,
      role: "management_admin",
    });

    await newUser.save();
    return res.status(201).json({ msg: "User created successfully!" });
  } catch (error) {
    console.error("Error creating management user: ", error);
    return res.status(500).json({ msg: "Internal server error!" });
  }
};

// Delete a management user
const managementDeleteUsers = async (req, res) => {
  const { email } = req.body;

  // Validate required field
  if (!email) {
    return res.status(400).json({ msg: "Email is required to delete a user!" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found!" });
    }

    // Delete the user
    await user.deleteOne();
    return res.json({ msg: "User deleted successfully!" });
  } catch (error) {
    console.error("Error deleting management user: ", error);
    return res.status(500).json({ msg: "Internal server error!" });
  }
};

export { managementUsers, managementAddUsers, managementDeleteUsers };
