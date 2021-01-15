import * as express from 'express';
import { NextFunction, Request, Response, Router } from 'express';
import { SpaceShip, SpaceShipDocument, SpaceShipModel, SpaceShipStatus } from '../models/SpaceShip';
import { BaseController } from './BaseController';
import SpaceShipService from '../services/SpaceShipService';

export class SpaceShipController extends BaseController {
    public path: string;
    public router: Router;

    constructor() {
        super();
        this.path = `/space-ships`;
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get( this.path, this.getSpaceShips );
        this.router.get( `${this.path}/:id`, this.getSpaceShipById );
        this.router.post( this.path, this.addSpaceShip );
        this.router.put( this.path, this.updateSpaceShip );
        this.router.put( `${this.path}/travel`, this.spaceShipTravel );
        this.router.delete( `${this.path}/:id`, this.removeSpaceShip );
    }

    getSpaceShips = async ( req: Request, res: Response, next: NextFunction ) => {
        const spaceShips = await SpaceShipService.getSpaceShips( next );
        return this.ok<Array<SpaceShip>>( res, spaceShips );
    }

    getSpaceShipById = async ( req: Request, res: Response, next: NextFunction ) => {
        const { id } = req.params;

        const spaceShip: SpaceShip = await SpaceShipService.getSpaceShipById( id, next );
        return !!spaceShip ? this.ok<SpaceShip>( res, spaceShip ) : this.clientError( res );

    }

    addSpaceShip = async ( req: Request, res: Response, next: NextFunction ) => {
        const { name, spaceShipModel, locationId, status } = req.body;
        const spaceShip = await SpaceShipService.saveSpaceShip( { name, spaceShipModel, location: locationId, status }, next );
        return !!spaceShip ? this.ok<SpaceShip>( res, spaceShip ) : this.clientError( res );
    }

    updateSpaceShip = async ( req: Request, res: Response, next: NextFunction ) => {
        const { id, status } = req.body;
        const updatedSpaceShip = await SpaceShipService.updateSpaceShipStatus( { id, status }, next );
        return !!updatedSpaceShip ? this.ok<SpaceShip>( res, updatedSpaceShip ) : this.clientError( res );
    }

    spaceShipTravel = async ( req: Request, res: Response, next: NextFunction ) => {
        const { id, location } = req.body;
        const updatedSpaceShip = await SpaceShipService.SpaceShipTravel( { id, location }, next );
        return !!updatedSpaceShip ? this.ok<SpaceShip>( res, updatedSpaceShip ) : this.clientError( res );
    }

    removeSpaceShip = async ( req: Request, res: Response, next: NextFunction ) => {
        const { id } = req.params;
        const success = await SpaceShipService.removeSpaceShip( id, next );
        return success ? this.ok<any>( res, { message: `Remove space ship ${id} successfully.` } ) : this.clientError( res );
    }
}