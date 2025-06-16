import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import interviewRequestRoutes from './routes/interviewRequests';

// Load environment variables
dotenv.config();

const app = express();
const httpServer = createServer(app);

// Socket.io setup with CORS
const io = new Server(httpServer, {
  cors: {
    origin: process.env.NODE_ENV === 'production' 
      ? ["https://job-platform-rho.vercel.app"] 
      : ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT"],
    credentials: true
  }
});

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://svignesh2409:GOgxz3UEBjCrSNtl@cluster0.hchjyx3.mongodb.net/job-platform';

// Middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === 'production' ? 100 : 1000, // limit each IP to 100 requests per windowMs in production
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ["https://job-platform-rho.vercel.app"] 
    : ["http://localhost:3000"],
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// MongoDB connection
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  });

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('👤 User connected:', socket.id);
  
  // Join recruiter room for targeted updates
  socket.on('join-recruiter', () => {
    socket.join('recruiters');
    console.log('🎯 Recruiter joined room');
  });
  
  socket.on('disconnect', () => {
    console.log('👋 User disconnected:', socket.id);
  });
});

// Make io accessible to routes
app.set('io', io);

// Routes
app.use('/api/interview-requests', interviewRequestRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    message: `Cannot ${req.method} ${req.originalUrl}`
  });
});

// Global error handler
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('❌ Global error:', error);
  
  // Mongoose validation error
  if (error.name === 'ValidationError') {
    const validationErrors = Object.values(error.errors).map((err: any) => err.message);
    return res.status(400).json({
      error: 'Validation Error',
      details: validationErrors
    });
  }
  
  // Mongoose duplicate key error
  if (error.code === 11000) {
    return res.status(400).json({
      error: 'Duplicate Entry',
      message: 'A record with this information already exists'
    });
  }
  
  // Default error
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'production' 
      ? 'Something went wrong' 
      : error.message
  });
});

// Start server
httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🗄️  Database: ${MONGODB_URI.includes('localhost') ? 'Local MongoDB' : 'MongoDB Atlas'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received, shutting down gracefully...');
  httpServer.close(() => {
    console.log('✅ Process terminated');
    mongoose.connection.close();
  });
});

export default app;