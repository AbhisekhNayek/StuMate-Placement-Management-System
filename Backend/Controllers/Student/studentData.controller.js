import User from '../../Models/user.model.js';
import Job from '../../Models/job.model.js';

/**
 * Get student data by year and branch
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const StudentDataYearBranchWise = async (req, res) => {
  try {
    const departments = ["Computer", "Civil", "ECS", "AIDS", "Mechanical"];
    const years = [1, 2, 3, 4];
    
    const result = {};

    for (const year of years) {
      for (const department of departments) {
        const key = `${year}Year${department}`;
        result[key] = await User.find({
          role: "student", 
          "studentProfile.department": department, 
          "studentProfile.year": year
        });
      }
    }

    return res.json(result);
  } catch (error) {
    console.log("student-data-for-admin.controller.js => ", error);
    return res.status(500).json({ msg: "Internal Server Error!" });
  }
}

/**
 * Notify students about their job application status
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const NotifyStudentStatus = async (req, res) => {
  try {
    const filteredStudents = await User.find({
      role: 'student',
      'studentProfile.appliedJobs.status': { $in: ['interview', 'hired'] }
    })
      .select('_id first_name last_name studentProfile.year studentProfile.department studentProfile.appliedJobs')
      .lean();

    // Collect all job IDs for the filtered students
    const jobIds = filteredStudents.flatMap(student => 
      student.studentProfile.appliedJobs.filter(job => ['interview', 'hired'].includes(job.status))
        .map(job => job.jobId)
    );

    // Fetch job details for all matching jobIds in one query
    const jobDetails = await Job.find({ _id: { $in: jobIds } })
      .populate('company', 'companyName')
      .select('company jobTitle _id')
      .lean();

    // Build the final student data with job details
    const studentsWithJobDetails = filteredStudents.map(student => {
      const appliedJobs = student.studentProfile.appliedJobs.filter(job => ['interview', 'hired'].includes(job.status));
      
      const jobsWithDetails = appliedJobs.map(job => {
        const jobDetail = jobDetails.find(jd => String(jd._id) === String(job.jobId));
        return {
          status: job.status,
          companyName: jobDetail?.company?.companyName || 'Unknown Company',
          jobId: jobDetail?._id || 'Unknown JobId',
          jobTitle: jobDetail?.jobTitle || 'Unknown Job Title'
        };
      });

      return {
        _id: student._id,
        name: `${student.first_name} ${student.last_name}`,
        year: student.studentProfile.year,
        department: student.studentProfile.department,
        jobs: jobsWithDetails
      };
    });

    return res.status(200).json({ studentsWithJobDetails });
  } catch (error) {
    console.log("student-data-for-admin.controller.js => ", error);
    return res.status(500).json({ msg: "Internal Server Error!" });
  }
}

export {
  StudentDataYearBranchWise,
  NotifyStudentStatus
};
