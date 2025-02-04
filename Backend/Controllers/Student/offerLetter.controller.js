// Import required modules
import JobSchema from '../../Models/job.model.js';

/**
 * Upload Offer Letter for a Student
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const UploadOfferLetter = async (req, res) => {
  try {
    // Check if file is uploaded
    if (!req.file) {
      return res.status(400).send('No offer letter uploaded');
    }

    // Find the job by jobId
    const job = await JobSchema.findById(req.body.jobId);
    if (!job) {
      return res.status(400).send('Job not found!');
    }

    const offerLetterPath = "/" + req.file.fieldname + "/" + req.file.filename;

    // Find the applicant by studentId
    const applicant = job.applicants.find(app => app.studentId == req.body.studentId);
    if (!applicant) {
      return res.status(400).send('Error: student not applied to this job!');
    }

    // Update the offer letter path
    applicant.offerLetter = offerLetterPath;

    // Save the updated job document
    await job.save();

    return res.json({ msg: 'Offer Letter Uploaded Successfully!' });
  } catch (error) {
    console.error('Error in UploadOfferLetter controller:', error);
    return res.status(500).json({ msg: 'Server error', error });
  }
};

/**
 * Delete Offer Letter for a Student
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const DeleteOfferLetter = async (req, res) => {
  try {
    // Check if the required parameters are provided
    if (!req.params) {
      return res.status(400).send('Error while receiving data!');
    }

    // Find the job by jobId
    const job = await JobSchema.findById(req.params.jobId);
    if (!job) {
      return res.status(400).send('Job not found!');
    }

    // Map through the applicants and remove the offer letter
    const updatedApplicants = job.applicants.map(app => {
      if (app.studentId == req.params.studentId) {
        const { offerLetter, ...rest } = app.toObject(); // Remove the offerLetter field
        return rest; // Return the applicant object without the offerLetter
      }
      return app;
    });

    job.applicants = updatedApplicants;

    // Save the updated job document
    await job.save();

    return res.json({ msg: 'Offer Letter Deleted Successfully!' });
  } catch (error) {
    console.error('Error in DeleteOfferLetter controller:', error);
    return res.status(500).json({ msg: 'Server error', error });
  }
};

// Export the functions using ES6 module syntax
export { UploadOfferLetter, DeleteOfferLetter };
