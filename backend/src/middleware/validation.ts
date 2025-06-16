import { Request, Response, NextFunction } from 'express';

interface ValidationError {
  field: string;
  message: string;
}

export const validateRequest = (req: Request, res: Response, next: NextFunction): void => {
  const { name, email, jobTitle } = req.body;
  const errors: ValidationError[] = [];

  // Validate name
  if (!name) {
    errors.push({ field: 'name', message: 'Name is required' });
  } else if (typeof name !== 'string') {
    errors.push({ field: 'name', message: 'Name must be a string' });
  } else if (name.trim().length < 2) {
    errors.push({ field: 'name', message: 'Name must be at least 2 characters long' });
  } else if (name.trim().length > 100) {
    errors.push({ field: 'name', message: 'Name cannot exceed 100 characters' });
  }

  // Validate email
  if (!email) {
    errors.push({ field: 'email', message: 'Email is required' });
  } else if (typeof email !== 'string') {
    errors.push({ field: 'email', message: 'Email must be a string' });
  } else if (!isValidEmail(email)) {
    errors.push({ field: 'email', message: 'Please provide a valid email address' });
  } else if (email.length > 255) {
    errors.push({ field: 'email', message: 'Email cannot exceed 255 characters' });
  }

  // Validate jobTitle
  if (!jobTitle) {
    errors.push({ field: 'jobTitle', message: 'Job title is required' });
  } else if (typeof jobTitle !== 'string') {
    errors.push({ field: 'jobTitle', message: 'Job title must be a string' });
  } else if (jobTitle.trim().length < 2) {
    errors.push({ field: 'jobTitle', message: 'Job title must be at least 2 characters long' });
  } else if (jobTitle.trim().length > 200) {
    errors.push({ field: 'jobTitle', message: 'Job title cannot exceed 200 characters' });
  }

  // Check for malicious content
  if (containsSuspiciousContent(name) || containsSuspiciousContent(email) || containsSuspiciousContent(jobTitle)) {
    errors.push({ field: 'general', message: 'Invalid content detected' });
  }

  if (errors.length > 0) {
    res.status(400).json({
      success: false,
      error: 'Validation Error',
      message: 'Please fix the following validation errors',
      details: errors
    });
    return;
  }

  next();
};

/**
 * Validate email format using regex
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.toLowerCase());
}

/**
 * Check for suspicious content that might indicate malicious input
 */
function containsSuspiciousContent(input: string): boolean {
  if (typeof input !== 'string') return false;
  
  const suspiciousPatterns = [
    /<script[^>]*>.*?<\/script>/gi,
    /javascript:/gi,
    /vbscript:/gi,
    /onload=/gi,
    /onerror=/gi,
    /onclick=/gi,
    /<iframe[^>]*>.*?<\/iframe>/gi,
    /eval\s*\(/gi,
    /expression\s*\(/gi
  ];

  return suspiciousPatterns.some(pattern => pattern.test(input));
}

/**
 * Sanitize string input by removing potentially harmful characters
 */
export function sanitizeString(input: string): string {
  if (typeof input !== 'string') return '';
  
  return input
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/vbscript:/gi, '') // Remove vbscript: protocol
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .trim();
}

/**
 * Validate MongoDB ObjectId format
 */
export function isValidObjectId(id: string): boolean {
  return /^[0-9a-fA-F]{24}$/.test(id);
}

/**
 * Validate status parameter for filtering
 */
export function isValidStatus(status: string): boolean {
  return ['pending', 'accepted', 'rejected'].includes(status);
}

/**
 * Middleware to validate ObjectId parameters
 */
export const validateObjectId = (paramName: string = 'id') => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const id = req.params[paramName];
    
    if (!id) {
      res.status(400).json({
        success: false,
        error: 'Missing Parameter',
        message: `${paramName} parameter is required`
      });
      return;
    }

    if (!isValidObjectId(id)) {
      res.status(400).json({
        success: false,
        error: 'Invalid ID',
        message: `Invalid ${paramName} format`
      });
      return;
    }

    next();
  };
};

/**
 * Middleware to validate query parameters
 */
export const validateQueryParams = (req: Request, res: Response, next: NextFunction): void => {
  const { status, limit, page } = req.query;

  if (status && typeof status === 'string' && !isValidStatus(status)) {
    res.status(400).json({
      success: false,
      error: 'Invalid Query Parameter',
      message: 'Status must be one of: pending, accepted, rejected'
    });
    return;
  }

  if (limit && (isNaN(Number(limit)) || Number(limit) < 1 || Number(limit) > 100)) {
    res.status(400).json({
      success: false,
      error: 'Invalid Query Parameter',
      message: 'Limit must be a number between 1 and 100'
    });
    return;
  }

  if (page && (isNaN(Number(page)) || Number(page) < 1)) {
    res.status(400).json({
      success: false,
      error: 'Invalid Query Parameter',
      message: 'Page must be a positive number'
    });
    return;
  }

  next();
};