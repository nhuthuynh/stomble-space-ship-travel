import * as express from 'express';
import * as mongoose from 'mongoose';

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
        this.connectDB();
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

    private connectDB() {
        const {
            MONGO_USER: dbUser,
            MONGO_PASSWORD: dbPass,
            MONGO_DB_NAME: dbName
        } = process.env;
        if ( !!dbUser && !!dbPass && !!dbName ) {
            const url = `mongodb+srv://${dbUser}:${dbPass}@cluster0.hmf53.mongodb.net/${dbName}?retryWrites=true&w=majority`;

            const connectionParams = {
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true
            }

            mongoose.connect( url, connectionParams )
                .then( () => {
                    console.log( 'Connected to database ' )
                } )
                .catch( ( err ) => {
                    console.error( `Error connecting to the database. \n${err}` );
                } );
        }
    }

    public listen() {
        this.app.listen( this.port, () => {
            console.log( `App listening on the port ${this.port}` );
        } );
    }
}