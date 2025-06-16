import mongoose, { Document, Schema } from 'mongoose';

// TypeScript interface for the document
export interface IInterviewRequest extends Document {
  name: string;
  email: string;
  jobTitle: string;
  status: 'pending' | 'accepted';
  createdAt: Date;
  updatedAt: Date;
}

// Mongoose schema
const InterviewRequestSchema = new Schema<IInterviewRequest>({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      'Please provide a valid email address'
    ],
    maxlength: [255, 'Email cannot exceed 255 characters']
  },
  jobTitle: {
    type: String,
    required: [true, 'Job title is required'],
    trim: true,
    maxlength: [200, 'Job title cannot exceed 200 characters']
  },
  status: {
    type: String,
    enum: {
      values: ['pending', 'accepted'],
      message: 'Status must be either pending or accepted'
    },
    default: 'pending'
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt automatically
  toJSON: {
    transform: function(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

// Indexes for better query performance
InterviewRequestSchema.index({ email: 1, jobTitle: 1 });
InterviewRequestSchema.index({ status: 1 });
InterviewRequestSchema.index({ createdAt: -1 });

// Instance methods
InterviewRequestSchema.methods.accept = function() {
  this.status = 'accepted';
  return this.save();
};

// Static methods
InterviewRequestSchema.statics.findPending = function() {
  return this.find({ status: 'pending' }).sort({ createdAt: -1 });
};

InterviewRequestSchema.statics.findAccepted = function() {
  return this.find({ status: 'accepted' }).sort({ createdAt: -1 });
};

// Pre-save middleware for additional validation
InterviewRequestSchema.pre('save', function(next) {
  if (this.isNew) {
    // Additional validation for new documents
    if (this.name.length < 2) {
      next(new Error('Name must be at least 2 characters long'));
      return;
    }
  }
  next();
});

// Create and export the model
const InterviewRequest = mongoose.model<IInterviewRequest>('InterviewRequest', InterviewRequestSchema);

export default InterviewRequest;