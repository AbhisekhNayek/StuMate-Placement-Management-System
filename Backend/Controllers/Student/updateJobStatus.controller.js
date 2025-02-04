import User from "../../Models/user.model.js";
import JobSchema from "../../Models/job.model.js";

const UpdateJobStatus = async (req, res) => {
  try {
    // Find the job and student by their IDs
    const job = await JobSchema.findById(req.params.jobId);
    const student = await User.findById(req.params.studentId);

    // Check if either the job or student does not exist
    if (!job || !student) {
      return res.status(404).json({ msg: "Student or Job Not Found!" });
    }

    // Update the job status for the applicant
    let applicantFound = false;
    job.applicants.forEach(app => {
      if (app.studentId.toString() === req.params.studentId) {
        applicantFound = true;
        // Update job application details if present in the request body
        const { currentRound, roundStatus, selectionDate, joiningDate, offerLetter, status } = req.body.applicant;
        
        if (currentRound) app.currentRound = currentRound;
        if (roundStatus) app.roundStatus = roundStatus;
        if (selectionDate) app.selectionDate = selectionDate;
        if (joiningDate) app.joiningDate = joiningDate;
        if (offerLetter) app.offerLetter = offerLetter;
        if (status) app.status = status;
      }
    });

    if (!applicantFound) {
      return res.status(404).json({ msg: "Applicant not found in the job application list!" });
    }

    // Update the student's applied job status
    let jobApplied = false;
    student.studentProfile.appliedJobs.forEach(app => {
      if (app.jobId.toString() === req.params.jobId) {
        jobApplied = true;
        const { status, package: pkg } = req.body.applicant;
        
        if (status) app.status = status;
        if (pkg) app.package = pkg;
      }
    });

    if (!jobApplied) {
      return res.status(404).json({ msg: "Job application not found for the student!" });
    }

    // Save the changes to the job and student documents
    await student.save();
    await job.save();

    return res.json({ msg: "Job Status Updated Successfully!" });

  } catch (error) {
    console.error("update-job-status.controller.js => ", error);
    return res.status(500).json({ msg: "Internal Server Error!" });
  }
};

export default UpdateJobStatus;
