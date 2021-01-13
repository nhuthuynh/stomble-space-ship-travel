import * as express from 'express';
import { Application } from 'express';
import { json, urlencoded } from 'body-parser';
import logger from './middlewares/logger';

export default class App {
    public app: Application;
    public port: string;
    private baseUrl: string = '/api';

    constructor( controllers: any[], port: string ) {
        this.app = express();
        this.port = port;
        this.initializeMiddlewares();
        this.initializeControllers( controllers );
    }

    private initializeMiddlewares() {
        this.app.use( json() );
        this.app.use( urlencoded( { extended: false } ) );
        this.app.use( logger );
    }

    private initializeControllers( controllers: any ) {
        controllers.forEach( ( controller ) => {
            console.log( 'controller', controller.path );
            this.app.use( this.baseUrl, controller.router );
        } );
    }

    public listen() {
        this.app.listen( this.port, () => {
            console.log( `App listening on the port ${this.port}` );
        } );
    }
}