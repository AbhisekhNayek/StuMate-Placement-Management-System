import User from "../../Models/user.model.js";
import bcrypt from "bcrypt";

// Get all TPO Admin users
const tpoUsers = async (req, res) => {
  try {
    const tpoUsersList = await User.find({ role: "tpo_admin" });
    res.json({ tpoUsers: tpoUsersList });
  } catch (error) {
    console.error("Error fetching TPO users: ", error);
    res.status(500).json({ msg: "Error fetching TPO users!" });
  }
}

// Add a new TPO Admin user
const tpoAddUsers = async (req, res) => {
  const { email, password, first_name, number } = req.body;

  // Validate required fields
  if (!email || !password || !first_name || !number) {
    return res.status(400).json({ msg: "Please provide all required fields: email, password, first_name, and number" });
  }

  try {
    // Check if the user already exists
    if (await User.findOne({ email })) {
      return res.status(400).json({ msg: "User already exists!" });
    }

    // Hash the password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create a new TPO user
    const newUser = new User({
      first_name,
      email,
      number,
      password: hashPassword,
      role: "tpo_admin",
    });

    await newUser.save();
    return res.status(201).json({ msg: "TPO Admin user created successfully!" });
  } catch (error) {
    console.error("Error creating TPO user: ", error);
    return res.status(500).json({ msg: "Internal Server Error!" });
  }
}

// Delete a TPO Admin user
const tpoDeleteUsers = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ msg: "Email is required to delete a user!" });
  }

  try {
    const deletionResult = await User.deleteOne({ email });
    
    if (deletionResult.deletedCount > 0) {
      return res.json({ msg: "User deleted successfully!" });
    } else {
      return res.status(404).json({ msg: "User not found!" });
    }
  } catch (error) {
    console.error("Error deleting TPO user: ", error);
    return res.status(500).json({ msg: "Error while deleting user!" });
  }
}

export {
  tpoUsers,
  tpoAddUsers,
  tpoDeleteUsers,
};
