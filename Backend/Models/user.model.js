import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  first_name: { type: String, trim: true, required: true },
  middle_name: { type: String, trim: true },
  last_name: { type: String, trim: true},
  gender: { type: String, enum: ["Male", "Female", "Other"] },
  email: { type: String, required: true, unique: true, trim: true, index: true },
  number: { type: Number, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["student", "tpo_admin", "management_admin", "superuser"],
    required: true,
  },
  profile: {
    type: String,
    default: "/profileImgs/default/defaultProfileImg.jpg",
  },
  fullAddress: {
    address: { type: String },
    pincode: { type: Number },
  },
  dateOfBirth: { type: Date },
  createdAt: { type: Date, default: Date.now },
  token: { type: String },
  isProfileCompleted: { type: Boolean, default: false },
  studentProfile: {
    isApproved: { type: Boolean, default: false },
    rollNumber: { type: Number },
    resume: {
      filename: { type: String, default: "" },
      filepath: { type: String, default: "" },
      contentType: { type: String, default: "" },
    },
    UIN: { type: String, unique: true, sparse: true, trim: true },
    department: {
      type: String,
      enum: ["Computer", "Civil", "ECS", "AIDS", "Mechanical"],
    },
    year: { type: Number, enum: [1, 2, 3, 4] },
    admissionYear: { type: Number },
    gap: { type: Boolean, default: false },
    liveKT: { type: Number, default: 0 },
    SGPA: {
      sem1: { type: Number },
      sem2: { type: Number },
      sem3: { type: Number },
      sem4: { type: Number },
      sem5: { type: Number },
      sem6: { type: Number },
      sem7: { type: Number },
      sem8: { type: Number },
    },
    pastQualification: {
      ssc: {
        board: { type: String, default: "" },
        percentage: { type: Number },
        year: { type: Number },
      },
      hsc: {
        board: { type: String, default: "" },
        percentage: { type: Number },
        year: { type: Number },
      },
      diploma: {
        department: { type: String, default: "" },
        percentage: { type: Number },
        year: { type: Number },
      },
    },
    appliedJobs: [
      {
        jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
        status: {
          type: String,
          enum: ["applied", "interview", "hired", "rejected"],
          default: "applied",
        },
        package: { type: Number },
        appliedAt: { type: Date, default: Date.now },
      },
    ],
    internships: [
      {
        type: {
          type: String,
          enum: [
            "Full Time",
            "Part Time",
            "On-Site",
            "Work From Home",
            "Other",
          ],
        },
        companyName: { type: String, default: "" },
        companyAddress: { type: String, default: "" },
        companyWebsite: { type: String, default: "" },
        internshipDuration: { type: Number },
        startDate: { type: Date },
        endDate: { type: Date },
        monthlyStipend: { type: Number },
        description: { type: String, default: "" },
      },
    ],
  },
  tpoProfile: {
    position: { type: String, trim: true, default: "" },
  },
  managementProfile: {
    position: { type: String, trim: true, default: "" },
  },
});

// Middleware to handle user-related cleanups before deletion
UserSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    try {
      const userId = this._id;

      const Notice = mongoose.model("Notice");
      const Job = mongoose.model("Job");

      await Job.updateMany(
        { "applicants.studentId": userId },
        { $pull: { applicants: { studentId: userId } } }
      );

      await Notice.updateMany(
        { sender: userId },
        { $pull: { sender: userId } }
      );

      next();
    } catch (error) {
      console.error("Error during user deletion middleware:", error);
      next(error);
    }
  }
);

// Check if model already exists before defining it
const UserModel = mongoose.models.Users || mongoose.model("Users", UserSchema);

export default UserModel;
