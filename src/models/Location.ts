import { Document, model, Types, Schema } from 'mongoose';
import { SpaceShipDocument } from './SpaceShip';

interface Location {
    cityName: String;
    planetName: String;
    spacePortCapacity: Number;
    spaceShips?: Types.ObjectId[] | SpaceShipDocument[];
}

interface LocationDocument extends Location, Document {
}

const LocationSchemaFields: Record<keyof Location, any> = {
    cityName: {
        type: String,
        required: true
    },
    planetName: {
        type: String,
        required: true
    },
    spacePortCapacity: {
        type: Number,
        default: 0,
        required: true
    },
    spaceShips: [{
        type: Schema.Types.ObjectId,
        ref: 'SpaceShip',
        required: false
    }]
}

const LocationSchema = new Schema( LocationSchemaFields );
LocationSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.__v;
    return obj;
}
const LocationModel = model<LocationDocument>( 'Location', LocationSchema );

export { LocationModel, Location, LocationDocument }