import JobSchema from "../../Models/job.model.js";

const AllJobs = async (req, res) => {
  try {
    const jobs = await JobSchema.find();
    return res.json({ data: jobs });
  } catch (error) {
    console.log("user.all-jobs.controller.js => ", error);
    return res.status(500).json({ msg: 'Server Error' });
  }
}

const DeleteJob = async (req, res) => {
  try {
    if (req.body.jobId) {
      const job = await JobSchema.findById(req.body.jobId);
      await job.deleteOne();
      return res.status(200).json({ msg: 'Job deleted successfully!' });
    }
  } catch (error) {
    console.log("user.all-jobs.controller.js => ", error);
    return res.status(500).json({ msg: 'Server Error' });
  }
}

const JobData = async (req, res) => {
  try {
    if (req.params.jobId !== 'undefined') {
      const job = await JobSchema.findById(req.params.jobId);
      return res.status(200).json(job);
    }
  } catch (error) {
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'job data not found' });
    }
    console.log("user.all-jobs.controller.js => ", error);
    return res.status(500).json({ msg: 'Server Error' });
  }
}

const JobWithApplicants = async (req, res) => {
  try {
    const job = await JobSchema.findById(req.params.jobId)
      .populate({
        path: 'applicants.studentId',
        select: '_id first_name last_name email'
      });

    if (!job) {
      return res.status(404).json({ msg: 'Job not found!' });
    }

    const applicantsList = job.applicants.map(applicant => ({
      id: applicant.studentId._id,
      name: applicant.studentId.first_name + " " + applicant.studentId.last_name,
      email: applicant.studentId.email,
      currentRound: applicant.currentRound,
      status: applicant.status,
      appliedAt: applicant.appliedAt,
    }));

    return res.status(200).json({ applicantsList });
  } catch (error) {
    console.log("Error fetching job with applicants => ", error);
    return res.status(500).json({ msg: 'Server Error' });
  }
};

const StudentJobsApplied = async (req, res) => {
  try {
    const appliedJobs = await JobSchema.find({ 'applicants.studentId': req.params.studentId })
      .populate('company', 'companyName')
      .select('jobTitle _id salary applicationDeadline applicants company')
      .lean();

    const result = appliedJobs.map(job => {
      const applicantDetails = job.applicants.find(applicant => applicant.studentId.toString() === req.params.studentId);
      return {
        jobTitle: job.jobTitle,
        jobId: job._id,
        salary: job.salary,
        applicationDeadline: job.applicationDeadline,
        companyName: job.company.companyName,
        numberOfApplicants: job.applicants.length,
        appliedAt: applicantDetails.appliedAt,
        status: applicantDetails.status
      };
    });

    return res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching student applied jobs => ", error);
    return res.status(500).json({ msg: 'Server error' });
  }
};

export {
  AllJobs,
  DeleteJob,
  JobData,
  JobWithApplicants,
  StudentJobsApplied
};
