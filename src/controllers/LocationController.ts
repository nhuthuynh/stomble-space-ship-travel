import * as express from 'express';
import { NextFunction, Request, Response, Router } from 'express';
import { LocationModel, Location, LocationDocument } from '../models/Location';
import { BaseController } from './BaseController';
import LocationService from '../services/LocationService';

export class LocationController extends BaseController {
    public path: string;
    public router: Router;

    constructor() {
        super();
        this.path = `/locations`;
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get( this.path, this.getLocations );
        this.router.get( `${this.path}/:id`, this.getLocationById );
        this.router.post( this.path, this.addLocation );
        this.router.delete( `${this.path}/:id`, this.removeLocation );
    }

    getLocations = async ( req: Request, res: Response ): Promise<any> => {
        const locations: Array<LocationDocument> = await LocationModel.find().populate( 'spaceShips' );
        return this.ok<Array<LocationDocument>>( res, locations );
    }

    getLocationById = async ( req: Request, res: Response, next: NextFunction ) => {
        const { id } = req.params;

        const location: Location = await LocationService.getLocationById( id, next );
        !!location && this.ok<Location>( res, location );
    }

    removeLocation = async ( req: Request, res: Response, next: NextFunction ) => {
        const { id } = req.params;

        const success = await LocationService.removeLocation( id, next );

        success && this.ok<any>( res, { message: `Remove location ${id} successfully.` } );
    }

    addLocation = async ( req: Request, res: Response, next: NextFunction ) => {
        const { cityName, planetName, spacePortCapacity } = req.body;
        const location = await LocationService.addLocation( { cityName, planetName, spacePortCapacity }, next );
        !!location && this.ok<Location>( res, location );
    }
}