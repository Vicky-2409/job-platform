import express from 'express';
import { InterviewRequestController } from '../controllers/interviewRequestController';
import { validateRequest } from '../middleware/validation';
import { asyncHandler } from '../middleware/asyncHandler';

const router = express.Router();

// GET /api/interview-requests - Fetch all interview requests with optional filtering
router.get(
  '/',
  asyncHandler(InterviewRequestController.getAllRequests)
);

// GET /api/interview-requests/stats - Get statistics about interview requests
router.get(
  '/stats',
  asyncHandler(InterviewRequestController.getStats)
);

// GET /api/interview-requests/:id - Get single interview request
router.get(
  '/:id',
  asyncHandler(InterviewRequestController.getRequestById)
);

// POST /api/interview-requests - Create new interview request
router.post(
  '/',
  validateRequest,
  asyncHandler(InterviewRequestController.createRequest)
);

// PUT /api/interview-requests/:id/accept - Accept interview request
router.put(
  '/:id/accept',
  asyncHandler(InterviewRequestController.acceptRequest)
);

// PUT /api/interview-requests/:id/reject - Reject interview request (bonus feature)
router.put(
  '/:id/reject',
  asyncHandler(InterviewRequestController.rejectRequest)
);

// DELETE /api/interview-requests/:id - Delete interview request (optional)
router.delete(
  '/:id',
  asyncHandler(InterviewRequestController.deleteRequest)
);

export default router;