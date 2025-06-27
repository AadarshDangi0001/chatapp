import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Message from '../models/Message.js';

const users = new Map();

export const setupSocket = (io) => {
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
      const user = await User.findById(decoded.id);
      socket.userId = user._id.toString();
      socket.username = user.username;
      next();
    } catch (err) {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket) => {
    users.set(socket.userId, socket.id);
    socket.join('general-group');

    socket.on('send_message', async (data) => {
      try {
        const message = new Message({
          sender: socket.userId,
          receiver: data.receiverId,
          content: data.content,
          isGroupMessage: false
        });
        await message.save();

        const populated = await message.populate(['sender', 'receiver']);

        const receiverSocketId = users.get(data.receiverId);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit('receive_message', populated);
        }
        socket.emit('message_sent', populated);
      } catch (err) {
        socket.emit('error', { msg: 'DM send failed' });
      }
    });

    socket.on('send_group_message', async (data) => {
      try {
        const message = new Message({
          sender: socket.userId,
          content: data.content,
          isGroupMessage: true
        });
        await message.save();
        const populated = await message.populate('sender');
        io.to('general-group').emit('receive_group_message', populated);
      } catch (err) {
        socket.emit('error', { msg: 'Group send failed' });
      }
    });

    socket.on('disconnect', async () => {
      users.delete(socket.userId);
      await User.findByIdAndUpdate(socket.userId, {
        isOnline: false,
        lastSeen: new Date()
      });
    });
  });
};

