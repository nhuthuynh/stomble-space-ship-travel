import { NextFunction } from "express";
import { LocationError } from "../exceptions/LocationError";
import { LocationModel, Location, LocationDocument } from "../models/Location";

const LocationService = {
    getLocationById: async ( id: string | number, next?: NextFunction ): Promise<Location | LocationDocument | null> => {
        if ( !!id ) {
            const location: LocationDocument = await LocationModel.findById( id ).populate( 'spaceShips' );
            if ( location )
                return location;
            else
                next && next( LocationError.LocationNotFoundError.create() );
        } else {
            next && next( LocationError.LocationNotFoundError.create() );
        }
        return null;
    },
    addLocation: async ( { cityName, planetName, spacePortCapacity = 0 }: Location, next?: NextFunction ): Promise<Location | LocationDocument | null> => {
        if ( !!cityName && !!planetName && !!spacePortCapacity ) {
            const newLocationModel = new LocationModel( { cityName, planetName, spacePortCapacity } );
            const newSavedLocation = await newLocationModel.save();
            return !!newSavedLocation ? newSavedLocation : null;
        } else {
            next && next( LocationError.LocationInvalidError.create() );
        }
    },
    removeLocation: async ( id: string | number, next?: NextFunction ): Promise<boolean> => {
        const location = await LocationService.getLocationById( id ) as LocationDocument;
        if ( location.spaceShips?.length > 0 ) {
            next && next( LocationError.LocationHasSpaceShipsRemoveError.create() );
            return false;
        }
        await LocationModel.deleteOne( { '_id': location._id } )
        return true;
    }
};

export default LocationService;