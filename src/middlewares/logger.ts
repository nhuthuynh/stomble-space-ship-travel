import { Request, Response } from 'express';
export default function loggerMiddleWare( req: Request, res: Response, next?: any ) {
    console.log( `Request path: ${req.path} \n\tmethod: ${req.method} \n\tparams: ${JSON.stringify( req.params )} \n\tbody: ${JSON.stringify( req.body )}` );
    next && next();
}