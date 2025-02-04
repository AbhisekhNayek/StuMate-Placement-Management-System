import Users from '../../Models/user.model.js';

// Controller to get all TPO users
export const getTPOUsers = async (req, res) => {
  try {
    // Fetch all users with the role "tpo_admin"
    const tpoUsers = await Users.find({ role: 'tpo_admin' });

    // Respond with the list of TPO users
    return res.status(200).json({ tpoUsers });
  } catch (error) {
    console.error('Error in getTPOUsers:', error);
    return res.status(500).json({ msg: 'Internal Server Error!' });
  }
};
