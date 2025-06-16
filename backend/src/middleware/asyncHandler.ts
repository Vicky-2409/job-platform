import { Request, Response, NextFunction } from 'express';

/**
 * Async handler wrapper to catch errors in async route handlers
 * This eliminates the need for try-catch blocks in every route handler
 */
export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

/**
 * Alternative async handler that provides better TypeScript support
 */
export const asyncHandlerWithTypes = <T extends Request = Request>(
  fn: (req: T, res: Response, next: NextFunction) => Promise<void>
) => {
  return (req: T, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

/**
 * Async handler specifically for controller methods
 */
export const controllerWrapper = (
  controllerMethod: (req: Request, res: Response) => Promise<void>
) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await controllerMethod(req, res);
    } catch (error) {
      next(error);
    }
  };
};