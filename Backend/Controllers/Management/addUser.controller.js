import bcrypt from 'bcrypt';
import Users from '../../Models/user.model.js';

// Helper function to check if a user exists and create a new user
const createUser = async ({ first_name, email, number, password, role, extraFields = {} }) => {
  const existingUser = await Users.findOne({ email });
  if (existingUser) {
    return { success: false, msg: 'User Already Exists!' };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new Users({
    first_name,
    email,
    number,
    password: hashedPassword,
    role,
    ...extraFields,
  });

  await newUser.save();
  return { success: true, msg: 'User Created!' };
};

// Controller to add a TPO user
export const addTPO = async (req, res) => {
  const { first_name, email, number, password } = req.body;

  try {
    const result = await createUser({
      first_name,
      email,
      number,
      password,
      role: 'tpo_admin',
    });

    return res.json({ msg: result.msg });
  } catch (error) {
    console.error('Error in addTPO:', error);
    return res.status(500).json({ msg: 'Internal Server Error!' });
  }
};

// Controller to add a Management user
export const addManagement = async (req, res) => {
  const { first_name, email, number, password } = req.body;

  try {
    const result = await createUser({
      first_name,
      email,
      number,
      password,
      role: 'management_admin',
    });

    return res.json({ msg: result.msg });
  } catch (error) {
    console.error('Error in addManagement:', error);
    return res.status(500).json({ msg: 'Internal Server Error!' });
  }
};

// Controller to add a Student user
export const addStudent = async (req, res) => {
  const { first_name, email, number, password } = req.body;

  try {
    const result = await createUser({
      first_name,
      email,
      number,
      password,
      role: 'student',
      extraFields: { 'studentProfile.isApproved': true },
    });

    return res.json({ msg: result.msg });
  } catch (error) {
    console.error('Error in addStudent:', error);
    return res.status(500).json({ msg: 'Internal Server Error!' });
  }
};
