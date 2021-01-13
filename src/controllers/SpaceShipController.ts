import * as express from 'express';
import { Request, Response, Router } from 'express';
import { BaseController } from './BaseController';

export class SpaceShipController extends BaseController {
    public path: string;
    public router: Router;

    constructor() {
        super();
        this.path = `/space-ship`;
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get( this.path, this.getSpaceShips );
    }

    getSpaceShips = ( req: Request, res: Response ) => {
        return this.ok<any>( res );
    }
}