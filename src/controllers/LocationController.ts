import * as express from 'express';
import { Request, Response, Router } from 'express';
import { LocationModel, Location } from '../models/Location';
import { BaseController } from './BaseController';

export class LocationController extends BaseController {
    public path: string;
    public router: Router;

    constructor() {
        super();
        this.path = `/location`;
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get( this.path, this.getLocations );
        this.router.get( `${this.path}/:id`, this.getLocationById );
        this.router.post( this.path, this.addLocation );
        this.router.put( this.path, this.updateLocation );
        this.router.delete( `${this.path}/:id`, this.removeLocation );
    }

    getLocations = async ( req: Request, res: Response ): Promise<any> => {
        const locations = await LocationModel.find();
        return this.ok<any>( res, locations );
    }

    getLocationById = ( req: Request, res: Response ) => {
        const { id } = req.params;

        if ( !!id ) {
            return this.ok<any>( res );
        } else {
            return this.fail( res, 'Location id is required!' );
        }
    }

    removeLocation = ( req: Request, res: Response ) => {
        return this.ok<any>( res );
    }

    addLocation = async ( req: Request, res: Response ) => {
        const { cityName, planetName, spacePortCapacity } = req.body;
        if ( !!cityName && !!planetName && !!spacePortCapacity ) {
            const newLocation: Location = { cityName, planetName, spacePortCapacity };
            const newLocationModel = new LocationModel( { ...newLocation } );
            await newLocationModel.save();
            return this.ok<Location>( res, newLocation );
        } else {
            return this.fail( res, 'City name, planet name and space port capacity are required!' );
        }
    }

    updateLocation = ( req: Request, res: Response ) => {
        return this.ok<any>( res );
    }
}