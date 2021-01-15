import { NextFunction } from "express";
import { LocationError } from "../exceptions/LocationError";
import { LocationModel, Location, LocationDocument } from "../models/Location";
import GeneralService from "./GeneralService";

class LocationService {
    private constructor() { }

    public static async getLocationById( id: string | number, next?: NextFunction ): Promise<Location | LocationDocument | null> {
        if ( !!id && GeneralService.isValideObjectId( id.toString(), next ) ) {
            const location: LocationDocument = await LocationModel.findById( id ).populate( 'spaceShips' );
            if ( location )
                return location;
            else
                next && next( LocationError.LocationNotFoundError.create() );
        } else {
            next && next( LocationError.LocationIdRequiredError.create() );
        }
        return null;
    }

    public static async addLocation( { cityName, planetName, spacePortCapacity = 0 }: Location, next?: NextFunction ): Promise<Location | LocationDocument | null> {
        if ( !!cityName && !!planetName && !!spacePortCapacity ) {
            const newLocationModel = new LocationModel( { cityName, planetName, spacePortCapacity } );
            const newSavedLocation = await newLocationModel.save();
            return !!newSavedLocation ? newSavedLocation : null;
        } else {
            next && next( LocationError.LocationInvalidError.create() );
        }
    }

    public static async removeLocation( id: string | number, next?: NextFunction ): Promise<boolean> {
        const location = await LocationService.getLocationById( id, next ) as LocationDocument;
        if ( location.spaceShips?.length > 0 ) {
            next && next( LocationError.LocationHasSpaceShipsRemoveError.create() );
            return false;
        }
        await LocationModel.deleteOne( { '_id': location._id } )
        return true;
    }
};

export default LocationService;