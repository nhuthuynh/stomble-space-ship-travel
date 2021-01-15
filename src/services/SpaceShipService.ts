import { NextFunction } from "express";
import { LocationError } from "../exceptions/LocationError";
import { SpaceShipError } from "../exceptions/SpaceShipError";
import { LocationDocument, LocationModel } from "../models/Location";
import { SpaceShip, SpaceShipDocument, SpaceShipModel, SpaceShipStatus } from "../models/SpaceShip";
import utils from "../utils/utils";
import GeneralService from "./GeneralService";
import LocationService from "./LocationService";

class SpaceShipService {
    private contructor() { }

    public static isValidSpaceShip( { name, spaceShipModel, location: locationId, status }: SpaceShip, next?: NextFunction ): boolean {
        if ( !!name && !!spaceShipModel && !!locationId && !!status && SpaceShipService.isValidSpaceShipStatus( status, next ) ) {
            if ( GeneralService.isValideObjectId( locationId.toString(), next ) ) {
                return true;
            }
        } else {
            next && next( SpaceShipError.SpaceShipInvalidError.create() );
        }
        return false;
    }

    public static isValidSpaceShipStatus( status: string | number, next?: NextFunction ): boolean {
        const spaceShipStatus = status as SpaceShipStatus;
        if ( spaceShipStatus !== SpaceShipStatus.Decommissioned && spaceShipStatus !== SpaceShipStatus.Maintenance && spaceShipStatus !== SpaceShipStatus.Operational ) {
            next && next( SpaceShipError.SpaceShipStatusNotFoundError.create( utils.getValuesFromEnum( SpaceShipStatus ).map( ( key: any ) => `${SpaceShipStatus[key]} value is ${key}` ).join( ', ' ) ) );
            return false;
        }
        return true;
    }

    public static getTravelableSpaceShipStatus(): string {
        return Object.keys( SpaceShipStatus ).find( key => SpaceShipStatus[key] == SpaceShipStatus.Operational ? key : '' ) || '';
    }

    public static canTravelStatus( status: string | number, next?: NextFunction ): boolean {
        const spaceShipStatus = status as SpaceShipStatus;
        if ( SpaceShipService.isValidSpaceShipStatus( status ) && spaceShipStatus !== SpaceShipStatus.Operational ) {
            next && next( SpaceShipError.SpaceShipTravelWithInvalidStatusError.create( SpaceShipService.getTravelableSpaceShipStatus() ) );
            return false;
        }
        return true;
    }
    public static async getSpaceShips( next?: NextFunction ): Promise<Array<SpaceShip | SpaceShipDocument | null>> {
        const spaceShip: Array<SpaceShip | SpaceShipDocument> = await SpaceShipModel.find();
        if ( spaceShip ) {
            return spaceShip;
        }
        else {
            next && next( SpaceShipError.SpaceShipNotFoundError.create() );
        }
        return null;
    }

    public static async getSpaceShipById( id: string | number, next?: NextFunction ): Promise<SpaceShip | SpaceShipDocument | null> {
        if ( !!id && GeneralService.isValideObjectId( id.toString(), next ) ) {

            const spaceShip: SpaceShip = await SpaceShipModel.findById( id );
            if ( spaceShip ) {
                return spaceShip;
            }
            else {
                next && next( SpaceShipError.SpaceShipNotFoundError.create() );
            }
        } else {
            next && next( SpaceShipError.SpaceShipIdRequiredError.create() );
        }
        return null;
    }

    public static async saveSpaceShip( { name, spaceShipModel, location: locationId, status }: SpaceShip, next?: NextFunction ): Promise<SpaceShip | SpaceShipDocument | null> {
        if ( SpaceShipService.isValidSpaceShip( { name, spaceShipModel, location: locationId, status }, next ) ) {

            const newSpaceShipModel = new SpaceShipModel( { name, spaceShipModel, location: locationId, status } );
            const newSavedSpaceShip: SpaceShipDocument = await newSpaceShipModel.save();
            const location = await LocationService.getLocationById( locationId.toString() );

            if ( location.spacePortCapacity === 0 ) {
                next( LocationError.LocationPortCapacityFullError.create( locationId.toString() ) );
                return null;
            }

            const portCapacity: any = location.spacePortCapacity;

            await LocationModel.findByIdAndUpdate( locationId,
                {
                    $set: {
                        spacePortCapacity: portCapacity - 1
                    },
                    $push: {
                        spaceShips: newSavedSpaceShip._id
                    }
                },
                { new: true, useFindAndModify: false }
            );
            const spaceShipWithLocation: SpaceShip = await newSpaceShipModel.populate( 'location' );
            return spaceShipWithLocation;
        }

        return null;
    }

    public static async updateSpaceShipStatus( { id, status }: { id: string; status: string | number; }, next?: NextFunction ): Promise<SpaceShip | SpaceShipDocument | null> {
        if ( !!id && GeneralService.isValideObjectId( id, next ) && SpaceShipService.isValidSpaceShipStatus( status, next ) ) {
            const spaceShipStatus = status as SpaceShipStatus;
            const updateSpaceShip = await SpaceShipModel.findByIdAndUpdate( id,
                {
                    $set: {
                        status: spaceShipStatus
                    }
                },
                { new: true, useFindAndModify: false }
            );
            if ( updateSpaceShip ) {
                return updateSpaceShip;
            }
            else {
                next && next( SpaceShipError.SpaceShipNotFoundError.create() );
            }
        } else {
            next( SpaceShipError.SpaceShipIdRequiredError.create() );
        }

        return null;
    }

    public static async SpaceShipTravel( { id, location }: { id: string; location: string; }, next?: NextFunction ): Promise<SpaceShip | SpaceShipDocument | null> {
        const spaceShip = await SpaceShipService.getSpaceShipById( id, next ) as SpaceShipDocument;

        if ( !SpaceShipService.canTravelStatus( spaceShip.status, next ) ) {
            return null;
        }

        if ( spaceShip.location.toString() == location ) {
            return spaceShip;
        }
        const newLocation = await LocationService.getLocationById( location ) as LocationDocument;
        const newLocationCapacity: any = newLocation.spacePortCapacity;

        if ( newLocationCapacity === 0 ) {
            next( LocationError.LocationPortCapacityFullError.create( newLocation._id.toString() ) );
            return null;
        }

        const currentLocation = await LocationService.getLocationById( spaceShip.location.toString() ) as LocationDocument;
        const currentLocationCapacity: any = currentLocation.spacePortCapacity;

        await LocationModel.findByIdAndUpdate( newLocation._id,
            {
                $set: {
                    spacePortCapacity: newLocationCapacity - 1
                },
                $push: {
                    spaceShips: spaceShip._id
                }
            },
            { new: true, useFindAndModify: false }
        )
        await LocationModel.findByIdAndUpdate( currentLocation._id,
            {
                $set: {
                    spacePortCapacity: currentLocationCapacity + 1
                },
                $pull: {
                    spaceShips: spaceShip._id
                }
            },
            { new: true, useFindAndModify: false }
        )

        const updateSpaceShip = await SpaceShipModel.findByIdAndUpdate( spaceShip._id,
            {
                $set: {
                    location: newLocation._id
                }
            },
            { new: true, useFindAndModify: false }
        )
        return updateSpaceShip;

    }

    public static async removeSpaceShip( id: string, next?: NextFunction ): Promise<boolean> {
        const spaceShip = await SpaceShipService.getSpaceShipById( id ) as SpaceShipDocument;
        const location = await LocationService.getLocationById( spaceShip.location.toString() ) as LocationDocument;
        if ( !!spaceShip && !!location ) {

            const locationCapacity: any = location.spacePortCapacity;
            const success = await LocationModel.findByIdAndUpdate( location._id, {
                $set: {
                    spacePortCapacity: locationCapacity + 1
                },
                $pull: {
                    spaceShips: spaceShip._id
                }
            },
                { new: true, useFindAndModify: false } );
            return success ? await SpaceShipModel.deleteOne( { '_id': spaceShip._id } ) : false;
        }
        return false;
    }
};

export default SpaceShipService;