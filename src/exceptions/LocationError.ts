import AppError from "./AppError";

export namespace LocationError {
    export class LocationNotFoundError extends AppError {
        constructor( location?: number | string ) {
            super( 404, `Location ${location} is not found.` );
        }

        public static create( location?: number | string ): LocationNotFoundError {
            return new LocationNotFoundError( location );
        }
    }

    export class LocationPortCapacityFullError extends AppError {
        constructor( location?: number | string ) {
            super( 400, `Location ${location} is full, cannot accept more space ship.` );
        }

        public static create( location?: number | string ): LocationPortCapacityFullError {
            return new LocationPortCapacityFullError( location );
        }
    }

    export class LocationHasSpaceShipsDeleteError extends AppError {
        constructor( location?: number | string ) {
            super( 400, `Cannot delete location having operational space ships.` );
        }

        public static create( location?: number | string ): LocationNotFoundError {
            return new LocationNotFoundError( location );
        }
    }

    export class LocationIdRequiredError extends AppError {
        constructor() {
            super( 404, `Location id is required.` );
        }

        public static create(): LocationIdRequiredError {
            return new LocationIdRequiredError();
        }
    }

    export class LocationRemoveError extends AppError {
        constructor( message?: string ) {
            super( 404, `Cannot delete the location ${message}` );
        }

        public static create( message?: string ): LocationRemoveError {
            return new LocationRemoveError( message );
        }
    }
}