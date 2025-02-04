import Users from '../../Models/user.model.js';

// Controller to delete a TPO user by email
export const deleteTPO = async (req, res) => {
  const { email } = req.body;

  try {
    // Validate email presence
    if (!email) {
      return res.status(400).json({ msg: 'Email is required to delete a user.' });
    }

    // Delete the user
    const result = await Users.deleteOne({ email });

    if (result.deletedCount > 0) {
      return res.json({ msg: 'User Deleted Successfully!' });
    } else {
      return res.status(404).json({ msg: 'User Not Found!' });
    }
  } catch (error) {
    console.error('Error in deleteTPO:', error);
    return res.status(500).json({ msg: 'Internal Server Error!' });
  }
};
