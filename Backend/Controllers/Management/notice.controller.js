import mongoose from 'mongoose';
import Notice from '../../Models/notice.model.js';

// Controller to send a notice
export const sendNotice = async (req, res) => {
  try {
    const {
      sender_role,
      title,
      message,
      sender,
      receiver_role = 'student', // Default receiver_role to 'student'
    } = req.body;

    // Validate required fields
    if (!sender || !sender_role || !title || !message) {
      return res.status(400).json({ msg: 'All required fields must be provided!' });
    }

    // Create a new notice
    await Notice.create({
      sender: new mongoose.Types.ObjectId(sender),
      sender_role,
      receiver_role,
      title,
      message,
    });

    return res.status(201).json({ msg: 'Notice Sent Successfully!' });
  } catch (error) {
    console.error('Error in sendNotice:', error);
    return res.status(500).json({ msg: 'Internal Server Error!' });
  }
};

// Controller to get all notices
export const getAllNotices = async (req, res) => {
  try {
    const notices = await Notice.find();
    return res.status(200).json(notices);
  } catch (error) {
    console.error('Error in getAllNotices:', error);
    return res.status(500).json({ msg: 'Internal Server Error!' });
  }
};

// Controller to get a specific notice by ID
export const getNotice = async (req, res) => {
  try {
    const { noticeId } = req.query;

    if (!noticeId) {
      return res.status(400).json({ msg: 'Notice ID is required!' });
    }

    const notice = await Notice.findById(noticeId);

    if (!notice) {
      return res.status(404).json({ msg: 'Notice not found!' });
    }

    return res.status(200).json(notice);
  } catch (error) {
    console.error('Error in getNotice:', error);
    return res.status(500).json({ msg: 'Internal Server Error!' });
  }
};

// Controller to delete a specific notice by ID
export const deleteNotice = async (req, res) => {
  try {
    const { noticeId } = req.query;

    if (!noticeId) {
      return res.status(400).json({ msg: 'Notice ID is required to delete!' });
    }

    const result = await Notice.findByIdAndDelete(noticeId);

    if (!result) {
      return res.status(404).json({ msg: 'Notice not found or already deleted!' });
    }

    return res.status(200).json({ msg: 'Notice Deleted Successfully!' });
  } catch (error) {
    console.error('Error in deleteNotice:', error);
    return res.status(500).json({ msg: 'Internal Server Error!' });
  }
};
