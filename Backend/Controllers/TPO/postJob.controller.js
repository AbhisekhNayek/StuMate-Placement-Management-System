import JobSchema from "../../Models/job.model.js";

const PostJob = async (req, res) => {
  try {
    const { company, jobTitle, jobDescription, eligibility, salary, howToApply, applicationDeadline } = req.body;

    if (!jobTitle || !jobDescription || !eligibility || !company) {
      return res.status(400).json({ msg: 'Job title, job description, eligibility and company name are required.' });
    }

    const job = await JobSchema.findById(req.body._id);

    if (job) {
      await job.updateOne({
        company,
        jobTitle,
        jobDescription,
        eligibility,
        salary,
        howToApply,
        applicationDeadline
      });
      res.status(201).json({ msg: 'Job Updated successfully' });
    } else {
      // Create a new job object
      const newJob = new JobSchema({
        jobTitle,
        jobDescription,
        eligibility,
        salary,
        howToApply,
        postedAt: new Date(),
        applicationDeadline,
        company
      });
      await newJob.save();
      return res.status(201).json({ msg: 'Job posted successfully' });
    }

  } catch (error) {
    console.log("tpo.post-job.controller.js => ", error);
    return res.status(500).json({ msg: 'Server error', error: error });
  }
};

export default PostJob;
