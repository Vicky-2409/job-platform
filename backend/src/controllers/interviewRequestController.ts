import { Request, Response } from 'express';
import { Server } from 'socket.io';
import InterviewRequest, { IInterviewRequest } from '../models/InterviewRequest';

export class InterviewRequestController {
  
  /**
   * GET /api/interview-requests - Fetch all interview requests
   */
  static async getAllRequests(req: Request, res: Response): Promise<void> {
    try {
      const { status } = req.query;
      
      let query = {};
      if (status && (status === 'pending' || status === 'accepted')) {
        query = { status };
      }
      
      const requests = await InterviewRequest.find(query)
        .sort({ createdAt: -1 })
        .lean(); // Use lean() for better performance when we don't need mongoose document methods
      
      res.status(200).json({
        success: true,
        data: requests,
        count: requests.length
      });
    } catch (error) {
      console.error('Error fetching interview requests:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch interview requests',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  /**
   * POST /api/interview-requests - Create new interview request
   */
  static async createRequest(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, jobTitle } = req.body;
      
      // Validation
      if (!name || !email || !jobTitle) {
        res.status(400).json({
          success: false,
          error: 'Validation Error',
          message: 'Name, email, and job title are required'
        });
        return;
      }
      
      // Check for duplicate request (same email and job title)
      const existingRequest = await InterviewRequest.findOne({
        email: email.toLowerCase(),
        jobTitle: jobTitle.trim(),
        status: 'pending'
      });
      
      if (existingRequest) {
        res.status(400).json({
          success: false,
          error: 'Duplicate Request',
          message: 'You have already submitted a request for this position. Please wait for a response.'
        });
        return;
      }
      
      // Create new interview request
      const newRequest = new InterviewRequest({
        name: name.trim(),
        email: email.toLowerCase().trim(),
        jobTitle: jobTitle.trim()
      });
      
      const savedRequest = await newRequest.save();
      
      // Emit real-time update to recruiters
      const io: Server = req.app.get('io');
      io.to('recruiters').emit('newInterviewRequest', {
        type: 'NEW_REQUEST',
        data: savedRequest.toJSON()
      });
      
      console.log(`📨 New interview request submitted: ${savedRequest.name} for ${savedRequest.jobTitle}`);
      
      res.status(201).json({
        success: true,
        message: 'Interview request submitted successfully',
        data: savedRequest.toJSON()
      });
      
    } catch (error) {
      console.error('Error creating interview request:', error);
      
      // Handle validation errors
      if (error instanceof Error && error.name === 'ValidationError') {
        res.status(400).json({
          success: false,
          error: 'Validation Error',
          message: error.message
        });
        return;
      }
      
      res.status(500).json({
        success: false,
        error: 'Internal Server Error',
        message: 'Failed to submit interview request'
      });
    }
  }

  /**
   * PUT /api/interview-requests/:id/accept - Accept interview request
   */
  static async acceptRequest(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      
      // Validate MongoDB ObjectId format
      if (!InterviewRequestController.isValidObjectId(id)) {
        res.status(400).json({
          success: false,
          error: 'Invalid ID',
          message: 'Invalid interview request ID format'
        });
        return;
      }
      
      const request = await InterviewRequest.findById(id);
      
      if (!request) {
        res.status(404).json({
          success: false,
          error: 'Not Found',
          message: 'Interview request not found'
        });
        return;
      }
      
      if (request.status === 'accepted') {
        res.status(400).json({
          success: false,
          error: 'Already Accepted',
          message: 'This interview request has already been accepted'
        });
        return;
      }
      
      // Update status
      request.status = 'accepted';
      const updatedRequest = await request.save();
      
      // Emit real-time update to recruiters
      const io: Server = req.app.get('io');
      io.to('recruiters').emit('requestStatusUpdate', {
        type: 'STATUS_UPDATE',
        data: updatedRequest.toJSON()
      });
      
      console.log(`✅ Interview request accepted: ${updatedRequest.name} for ${updatedRequest.jobTitle}`);
      
      res.status(200).json({
        success: true,
        message: 'Interview request accepted successfully',
        data: updatedRequest.toJSON()
      });
      
    } catch (error) {
      console.error('Error accepting interview request:', error);
      res.status(500).json({
        success: false,
        error: 'Internal Server Error',
        message: 'Failed to accept interview request'
      });
    }
  }

  /**
   * GET /api/interview-requests/:id - Get single interview request
   */
  static async getRequestById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      
      if (!InterviewRequestController.isValidObjectId(id)) {
        res.status(400).json({
          success: false,
          error: 'Invalid ID',
          message: 'Invalid interview request ID format'
        });
        return;
      }
      
      const request = await InterviewRequest.findById(id);
      
      if (!request) {
        res.status(404).json({
          success: false,
          error: 'Not Found',
          message: 'Interview request not found'
        });
        return;
      }
      
      res.status(200).json({
        success: true,
        data: request.toJSON()
      });
      
    } catch (error) {
      console.error('Error fetching interview request:', error);
      res.status(500).json({
        success: false,
        error: 'Internal Server Error',
        message: 'Failed to fetch interview request'
      });
    }
  }

  /**
   * DELETE /api/interview-requests/:id - Delete interview request (optional)
   */
  static async deleteRequest(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      
      if (!InterviewRequestController.isValidObjectId(id)) {
        res.status(400).json({
          success: false,
          error: 'Invalid ID',
          message: 'Invalid interview request ID format'
        });
        return;
      }
      
      const request = await InterviewRequest.findByIdAndDelete(id);
      
      if (!request) {
        res.status(404).json({
          success: false,
          error: 'Not Found',
          message: 'Interview request not found'
        });
        return;
      }
      
      // Emit real-time update to recruiters
      const io: Server = req.app.get('io');
      io.to('recruiters').emit('requestDeleted', {
        type: 'REQUEST_DELETED',
        data: { id }
      });
      
      res.status(200).json({
        success: true,
        message: 'Interview request deleted successfully'
      });
      
    } catch (error) {
      console.error('Error deleting interview request:', error);
      res.status(500).json({
        success: false,
        error: 'Internal Server Error',
        message: 'Failed to delete interview request'
      });
    }
  }

  /**
   * PUT /api/interview-requests/:id/reject - Reject interview request (bonus feature)
   */
  static async rejectRequest(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { reason } = req.body;
      
      if (!InterviewRequestController.isValidObjectId(id)) {
        res.status(400).json({
          success: false,
          error: 'Invalid ID',
          message: 'Invalid interview request ID format'
        });
        return;
      }
      
      const request = await InterviewRequest.findById(id);
      
      if (!request) {
        res.status(404).json({
          success: false,
          error: 'Not Found',
          message: 'Interview request not found'
        });
        return;
      }
      
      if (request.status !== 'pending') {
        res.status(400).json({
          success: false,
          error: 'Invalid Status',
          message: 'Only pending requests can be rejected'
        });
        return;
      }
      
      // Update status to rejected (you may need to add this to your enum)
      request.status = 'rejected' as any;
      if (reason) {
        (request as any).rejectionReason = reason;
      }
      const updatedRequest = await request.save();
      
      // Emit real-time update to recruiters
      const io: Server = req.app.get('io');
      io.to('recruiters').emit('requestStatusUpdate', {
        type: 'STATUS_UPDATE',
        data: updatedRequest.toJSON()
      });
      
      console.log(`❌ Interview request rejected: ${updatedRequest.name} for ${updatedRequest.jobTitle}`);
      
      res.status(200).json({
        success: true,
        message: 'Interview request rejected successfully',
        data: updatedRequest.toJSON()
      });
      
    } catch (error) {
      console.error('Error rejecting interview request:', error);
      res.status(500).json({
        success: false,
        error: 'Internal Server Error',
        message: 'Failed to reject interview request'
      });
    }
  }

  /**
   * GET /api/interview-requests/stats - Get statistics about interview requests
   */
  static async getStats(req: Request, res: Response): Promise<void> {
    try {
      const [total, pending, accepted] = await Promise.all([
        InterviewRequest.countDocuments(),
        InterviewRequest.countDocuments({ status: 'pending' }),
        InterviewRequest.countDocuments({ status: 'accepted' })
      ]);

      // Get recent requests (last 7 days)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      
      const recentRequests = await InterviewRequest.countDocuments({
        createdAt: { $gte: sevenDaysAgo }
      });

      // Get popular job titles
      const popularJobTitles = await InterviewRequest.aggregate([
        {
          $group: {
            _id: '$jobTitle',
            count: { $sum: 1 }
          }
        },
        {
          $sort: { count: -1 }
        },
        {
          $limit: 5
        }
      ]);

      res.status(200).json({
        success: true,
        data: {
          total,
          pending,
          accepted,
          rejected: total - pending - accepted,
          recentRequests,
          popularJobTitles: popularJobTitles.map(item => ({
            jobTitle: item._id,
            count: item.count
          }))
        }
      });
      
    } catch (error) {
      console.error('Error fetching stats:', error);
      res.status(500).json({
        success: false,
        error: 'Internal Server Error',
        message: 'Failed to fetch statistics'
      });
    }
  }

  /**
   * Helper method to validate MongoDB ObjectId format
   */
  private static isValidObjectId(id: string): boolean {
    return /^[0-9a-fA-F]{24}$/.test(id);
  }

  /**
   * Helper method to validate email format
   */
  private static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Helper method to sanitize input data
   */
  private static sanitizeInput(data: any): any {
    if (typeof data === 'string') {
      return data.trim();
    }
    if (typeof data === 'object' && data !== null) {
      const sanitized: any = {};
      for (const key in data) {
        sanitized[key] = InterviewRequestController.sanitizeInput(data[key]);
      }
      return sanitized;
    }
    return data;
  }
}