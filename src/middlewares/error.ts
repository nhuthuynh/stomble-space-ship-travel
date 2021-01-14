import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../controllers/BaseController';
import AppError from '../exceptions/AppError';

function errorMiddleware( { status = 500, message = 'Something went wrong' }: AppError, request: Request, response: Response, next: NextFunction ) {
    return BaseController.jsonResponse( response, status, message );
}

export default errorMiddleware;