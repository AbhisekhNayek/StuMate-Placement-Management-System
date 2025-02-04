// Import necessary modules
import User from '../../Models/user.model.js';

// Fetch internships for a specific student
export const getInternships = async (req, res) => {
  try {
    const { studentId, internshipId } = req.query;

    // Fetch student by ID
    const student = await User.findById(studentId);
    if (!student) return res.status(404).json({ msg: 'Student Not Found!' });

    const internships = student?.studentProfile?.internships || [];
    if (!internships.length) return res.status(404).json({ msg: 'No Internship Found!' });

    // Find specific internship if internshipId is provided
    const internship = internships.find((intern) => intern._id.toString() === internshipId);

    return res.status(200).json({ internships, internship });
  } catch (error) {
    console.error('Error in getInternships:', error);
    return res.status(500).json({ msg: 'Internal Server Error!' });
  }
};

// Update or add a new internship
export const updateInternship = async (req, res) => {
  try {
    const { studentId, internshipId } = req.query;
    const { internship } = req.body;

    if (!internship) return res.status(400).json({ msg: 'No data received to update!' });

    // Validate mandatory fields
    const { companyName, internshipDuration, startDate, type } = internship;
    if (!companyName || !internshipDuration || !startDate || !type) {
      return res.status(400).json({ msg: 'Mandatory fields are missing!' });
    }

    const student = await User.findById(studentId);
    if (!student) return res.status(404).json({ msg: 'Student Not Found!' });

    const {
      companyAddress,
      companyWebsite,
      endDate,
      monthlyStipend,
      description,
    } = internship;

    // Define new internship object
    const newInternship = {
      type,
      companyName,
      companyAddress,
      companyWebsite,
      internshipDuration,
      startDate,
      endDate,
      monthlyStipend,
      description,
    };

    if (!internshipId || internshipId === 'undefined') {
      // Add new internship
      student.studentProfile.internships.push(newInternship);
    } else {
      // Update existing internship
      const existingInternship = student.studentProfile.internships.find(
        (intern) => intern._id.toString() === internshipId
      );
      if (!existingInternship) {
        return res.status(404).json({ msg: 'Internship Not Found!' });
      }

      // Update fields
      Object.assign(existingInternship, newInternship);
    }

    // Save changes
    await student.save();
    return res.status(200).json({ msg: 'Internship Updated Successfully!' });
  } catch (error) {
    console.error('Error in updateInternship:', error);
    return res.status(500).json({ msg: 'Internal Server Error!' });
  }
};

// Delete an internship
export const deleteInternship = async (req, res) => {
  try {
    const { studentId, internshipId } = req.body;

    const student = await User.findById(studentId);
    if (!student) return res.status(404).json({ msg: 'Student Not Found!' });

    const internshipIndex = student.studentProfile.internships.findIndex(
      (intern) => intern._id.toString() === internshipId
    );
    if (internshipIndex === -1) return res.status(404).json({ msg: 'No Internship Found!' });

    // Remove internship
    student.studentProfile.internships.splice(internshipIndex, 1);

    // Save changes
    await student.save();
    return res.status(200).json({ msg: 'Internship Deleted Successfully!' });
  } catch (error) {
    console.error('Error in deleteInternship:', error);
    return res.status(500).json({ msg: 'Internal Server Error!' });
  }
};
