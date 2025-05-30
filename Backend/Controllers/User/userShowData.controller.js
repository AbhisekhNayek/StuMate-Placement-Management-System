import User from "../../Models/user.model.js";

const UserData = async (req, res) => {
  const { userId } = req.params;

  try {
    // Fetch user details from the database
    const user = await User.findById(userId)
      .populate({
        path: 'studentProfile.appliedJobs.jobId',
        populate: { path: 'company', select: 'companyName' } // Populates companyName from the Company model
      });

    // Check if user exists
    if (!user)
      return res.status(404).json({ msg: 'Student not found' });

    // Return the user details
    return res.json(user);
  } catch (error) {
    // checking if userId exists or not
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'User not found' });
    }
    console.error('Error fetching user details:', error);
    return res.status(500).json({ msg: 'Server error' });
  }
};

export default UserData;
