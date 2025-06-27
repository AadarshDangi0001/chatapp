import Message from '../models/Message.js';
import User from '../models/User.js';

export const getUsers = async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user._id },
        { receiver: req.user._id }
      ]
    });

    const userIds = new Set();
    messages.forEach(msg => {
      if (msg.sender.toString() !== req.user._id.toString()) userIds.add(msg.sender.toString());
      if (msg.receiver?.toString() !== req.user._id.toString()) userIds.add(msg.receiver?.toString());
    });

    const users = await User.find({ _id: { $in: [...userIds] } }).select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { userId } = req.params;
    const messages = await Message.find({
      $or: [
        { sender: req.user._id, receiver: userId },
        { sender: userId, receiver: req.user._id }
      ]
    }).populate('sender receiver', 'username').sort({ timestamp: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getGroupMessages = async (req, res) => {
  try {
    const messages = await Message.find({ isGroupMessage: true })
      .populate('sender', 'username')
      .sort({ timestamp: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};