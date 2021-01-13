import * as express from 'express';
import { Request, Response } from 'express';

export abstract class BaseController {
    public baseUrl = 'api';

    public static jsonResponse( res: Response, code: number, message: string ) {
        return res.status( code ).json( { message } );
    }

    public ok<T>( res: Response, dto?: T ) {
        if ( !!dto ) {
            res.type( 'application/json' );
            return res.status( 200 ).json( dto );
        } else {
            return res.sendStatus( 200 );
        }
    }

    public clientError( res: Response, message?: string ) {
        return BaseController.jsonResponse( res, 400, message ? message : 'Unauthorized' );
    }

    public notFound( res: Response, message?: string ) {
        return BaseController.jsonResponse( res, 404, message ? message : 'Not found' );
    }

    public conflict( res: Response, message?: string ) {
        return BaseController.jsonResponse( res, 409, message ? message : 'Conflict' );
    }

    public fail( res: Response, error: Error | string ) {
        console.error( error );
        return res.status( 500 ).json( {
            message: error.toString()
        } );
    }
}