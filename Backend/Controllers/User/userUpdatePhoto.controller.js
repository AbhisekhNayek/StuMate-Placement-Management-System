import User from "../../models/user.model.js";

const UpdatePhoto = async (req, res) => {
  const file = req.file;

  if (!file) return res.status(400).json({ msg: 'No file uploaded.' });

  try {
    // Retrieve user
    const userId = req.body.userId;

    // Update the user with the new profile photo filename
    const user = await User.findById(userId);
    user.profile = "/" + file.fieldname + "/" + file.filename;
    await user.save();

    return res.status(201).json({ msg: "Profile Picture Updated Successfully!", file: user.profile });
  } catch (error) {
    console.error('Error saving to database:', error);
    return res.status(500).send('Server error');
  }
};

export default UpdatePhoto;
