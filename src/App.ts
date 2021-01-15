import express from 'express';
import mongoose from 'mongoose';

import { Application } from 'express';
import cors from 'cors';
import compression from 'compression';
import { json, urlencoded } from 'body-parser';
import { url as dbUrl, connectionParams } from './config/db';
import loggerMiddleWare from './middlewares/logger';
import errorMiddleware from './middlewares/error';
import { handleAPIDocs } from './middlewares/swagger';

export default class App {
    public app: Application;
    public port: string;
    private baseUrl: string = '/api';

    constructor( controllers: any[], port: string ) {
        this.app = express();
        this.port = port;
        this.connectDB();
        this.initializeMiddlewares();
        this.initializeControllers( controllers );
    }

    private initializeMiddlewares() {
        this.app.use( cors( { credentials: true, origin: true } ) );
        this.app.use( json() );
        this.app.use( urlencoded( { extended: false } ) );
        this.app.use( compression() );
        handleAPIDocs( this.app );
        this.app.use( loggerMiddleWare );
        this.app.use( errorMiddleware )
    }

    private initializeControllers( controllers: any ) {
        controllers.forEach( ( controller ) => {
            this.app.use( this.baseUrl, controller.router );
        } );
    }

    private connectDB() {
        mongoose.connect( dbUrl, connectionParams )
            .then( () => {
                console.log( 'Connected to database ' )
            } )
            .catch( ( err ) => {
                console.error( `Error connecting to the database. \n${err}` );
            } );
    }

    public listen() {
        this.app.listen( this.port, () => {
            console.log( `App listening on the port ${this.port}` );
        } );
    }
}