/**
 * @class SpaceShipController
 * @desc Responsible for handling API requests for the
 * SpaceShip routes.
 **/

import * as express from 'express';
import { Request, Response } from 'express';
import { ISpaceShipRepo } from '../repositories/SpaceShipRepo';
import { BaseController } from './BaseController';

export class SpaceShipController extends BaseController {
    private spaceShipRepo: ISpaceShipRepo;

    constructor (spaceShipRepo: ISpaceShipRepo) {
        super();
        this.spaceShipRepo = spaceShipRepo;
    }

    protected async executeImpl(req: Request, res: Response): Promise<void | any> {
        try {

        } catch(err) {
            return this.fail(res, err.toString());
        }
    }
}