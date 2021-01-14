import { NextFunction } from "express";
import { LocationError } from "../exceptions/LocationError";
import { LocationModel, Location, LocationDocument } from "../models/Location";

const LocationService = {
    getLocationById: async ( id: string | number, next?: NextFunction ): Promise<Location | LocationDocument | null> => {
        if ( !!id ) {
            const location: LocationDocument = await LocationModel.findById( id );
            if ( location ) {
                return location;
            }
            else {
                next && next( LocationError.LocationNotFoundError.create() );
            }
        } else {
            next && next( LocationError.LocationNotFoundError.create() );
        }
    }
};

export default LocationService;