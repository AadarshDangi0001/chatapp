import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import chatRoutes from './routes/chat.js';
import { setupSocket } from './socket/socketHandler.js';

dotenv.config();
connectDB();

const app = express();
const server = createServer(app);

// ✅ Get frontend URL from env
const FRONTEND_URL = process.env.FRONTEND_URL;

const io = new Server(server, {
  cors: {
    origin: FRONTEND_URL,
    credentials: true
  }
});

app.use(cors({
  origin: FRONTEND_URL,
  credentials: true
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

setupSocket(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
