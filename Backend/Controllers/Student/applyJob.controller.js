import User from '../../Models/user.model.js';
import Job from '../../Models/job.model.js';

// Controller to handle job application
export const applyToJob = async (req, res) => {
  try {
    const { studentId, jobId } = req.params;

    // Validate required parameters
    if (!studentId || studentId === 'undefined') {
      return res.status(400).json({ msg: 'Student ID is required!' });
    }
    if (!jobId || jobId === 'undefined') {
      return res.status(400).json({ msg: 'Job ID is required!' });
    }

    const user = await User.findById(studentId);
    const job = await Job.findById(jobId);

    if (!user) {
      return res.status(404).json({ msg: 'Student not found!' });
    }
    if (!job) {
      return res.status(404).json({ msg: 'Job not found!' });
    }

    // Check if already applied
    const alreadyApplied = user.studentProfile?.appliedJobs?.some((job) => job.jobId === jobId);
    if (alreadyApplied) {
      return res.status(400).json({ msg: 'Already Applied!' });
    }

    // Check if resume exists
    if (!user.studentProfile?.resume?.filename) {
      return res.status(400).json({ msg: 'Please upload a resume first under "Placements" > "Placement Profile".' });
    }

    // Add the job to applied jobs for the user
    user.studentProfile.appliedJobs.push({ jobId, status: 'applied' });

    // Add the user to applicants for the job
    job.applicants.push({ studentId: user._id });

    // Save the changes
    await user.save();
    await job.save();

    return res.status(201).json({ msg: 'Applied Successfully!' });
  } catch (error) {
    console.error('Error in applyToJob:', error);
    return res.status(500).json({ msg: 'Internal Server Error!' });
  }
};

// Controller to check if the student already applied for a job
export const checkAlreadyApplied = async (req, res) => {
  try {
    const { studentId, jobId } = req.params;

    // Validate required parameters
    if (!studentId || studentId === 'undefined') {
      return res.status(400).json({ msg: 'Student ID is required!' });
    }
    if (!jobId || jobId === 'undefined') {
      return res.status(400).json({ msg: 'Job ID is required!' });
    }

    const user = await User.findById(studentId);

    if (!user) {
      return res.status(404).json({ msg: 'Student not found!' });
    }

    // Check if already applied
    const alreadyApplied = user.studentProfile?.appliedJobs?.some((job) => job.jobId === jobId);

    return res.status(200).json({ applied: !!alreadyApplied });
  } catch (error) {
    console.error('Error in checkAlreadyApplied:', error);
    return res.status(500).json({ msg: 'Internal Server Error!' });
  }
};
