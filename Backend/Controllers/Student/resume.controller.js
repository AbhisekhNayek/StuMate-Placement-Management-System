import User from '../../Models/user.model.js';

/**
 * Upload Resume for a Student
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const UploadResume = async (req, res) => {
  try {
    // Check if file is uploaded
    if (!req.file) {
      return res.status(400).send('No resume uploaded');
    }

    // Find the student by userId
    const user = await User.findById(req.body.userId);
    if (!user) {
      return res.status(404).send('Student not found!');
    }

    // Prepare the resume path
    const resumePath = "/" + req.file.fieldname + "/" + req.file.filename;

    // Update the student's resume information
    user.studentProfile.resume = {
      filename: req.file.filename,
      filepath: resumePath,
      contentType: req.file.mimetype
    };

    // Save the updated user document
    await user.save();

    return res.status(200).json({ msg: 'Resume uploaded successfully!' });
  } catch (error) {
    console.error('Error in UploadResume controller:', error);
    return res.status(500).json({ msg: 'Server error', error });
  }
};

// Export the function using ES6 module syntax
export default UploadResume;
