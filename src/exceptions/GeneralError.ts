import AppError from "./AppError";

export namespace GeneralError {
    export class MongooseInvalidObjectIdError extends AppError {
        constructor( id?: number | string ) {
            super( 400, `id ${id} is invalid.` );
        }

        public static create( id?: number | string ): MongooseInvalidObjectIdError {
            return new MongooseInvalidObjectIdError( id );
        }
    }
}