import { NextFunction } from "express";
import { GeneralError } from "../exceptions/GeneralError";
import utils from "../utils/utils";

class GeneralService {
    private contructor() { }

    public static isValideObjectId( id: string, next?: NextFunction ): boolean {
        if ( utils.isValideObjectId( id ) ) {
            return true;
        } else {
            next && next( GeneralError.MongooseInvalidObjectIdError.create( id ) );
        }
    }
}

export default GeneralService;