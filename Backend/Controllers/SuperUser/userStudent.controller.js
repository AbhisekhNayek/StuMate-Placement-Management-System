import User from "../../Models/user.model.js";
import bcrypt from "bcrypt";

// Get all student users
const studentUsers = async (req, res) => {
  try {
    const studentUsersList = await User.find({ role: "student" });
    res.json({ studentUsers: studentUsersList });
  } catch (error) {
    console.error("Error fetching student users: ", error);
    return res.status(500).json({ msg: "Error fetching student users!" });
  }
}

// Add a new student user
const studentAddUsers = async (req, res) => {
  const { email, first_name, number, password } = req.body;

  // Validate required fields
  if (!email || !first_name || !number || !password) {
    return res.status(400).json({ msg: "Please provide all required fields: email, first_name, number, and password" });
  }

  try {
    // Check if the user already exists
    if (await User.findOne({ email })) {
      return res.status(400).json({ msg: "User already exists!" });
    }

    // Hash the password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create a new student user
    const newUser = new User({
      first_name,
      email,
      number,
      password: hashPassword,
      role: "student",
      studentProfile: {
        isApproved: true,  // Assuming default approved status
      },
    });

    await newUser.save();
    return res.status(201).json({ msg: "Student user created successfully!" });
  } catch (error) {
    console.error("Error creating student user: ", error);
    return res.status(500).json({ msg: "Server error!" });
  }
}

// Delete a student user
const studentDeleteUsers = async (req, res) => {
  const { email } = req.body;

  // Validate required field
  if (!email) {
    return res.status(400).json({ msg: "Email is required to delete a user!" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: "Student user not found!" });
    }

    // Delete the user and associated data
    await user.deleteOne();
    return res.json({ msg: "Student user deleted successfully!" });
  } catch (error) {
    console.error("Error deleting student user: ", error);
    return res.status(500).json({ msg: "Server error!" });
  }
}

// Approve a student user
const studentApprove = async (req, res) => {
  const { email } = req.body;

  // Validate required field
  if (!email) {
    return res.status(400).json({ msg: "Email is required to approve a user!" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: "Student not found!" });
    }

    user.studentProfile.isApproved = true;
    await user.save();
    return res.json({ msg: "Student successfully approved!" });
  } catch (error) {
    console.error("Error approving student user: ", error);
    return res.status(500).json({ msg: "Server error!" });
  }
}

export {
  studentUsers,
  studentAddUsers,
  studentDeleteUsers,
  studentApprove,
};
