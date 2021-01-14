import { Document, model, Types, Schema } from 'mongoose';
import { LocationDocument } from './Location';

interface SpaceShip {
    name: String;
    spaceShipModel: String;
    location: Types.ObjectId | LocationDocument | String;
    status: Status;
}

interface SpaceShipDocument extends SpaceShip, Document {
};

const SpaceShipSchemaFields: Record<keyof SpaceShip, any> = {
    name: {
        type: String,
        required: true,
    },
    spaceShipModel: {
        type: String,
        required: true
    },
    location: {
        type: Schema.Types.ObjectId,
        ref: "Location",
        required: true
    },
    status: {
        type: Number,
        enum: [0, 1, 2],
        default: 2,
        required: true
    }
}

enum Status {
    Decommissioned = 0,
    Maintenance = 1,
    Operational = 2
}

const SpaceShipSchema = new Schema( SpaceShipSchemaFields );

const SpaceShipModel = model<SpaceShipDocument>( 'SpaceShip', SpaceShipSchema );

export { SpaceShipModel, SpaceShipDocument, SpaceShip, Status as SpaceShipStatus }